#!/usr/bin/env node
import { values, map } from 'lodash-es'
import errors_ from '#lib/errors'
import { exitOnMissingInstance } from '#lib/exit_on_missing'
import getRedirectedSitelinkTitle from '#lib/get_redirected_sitelink_title'
import { outputFactory } from '#lib/output'
import program from '#lib/program'
import { get } from '#lib/request'
import { getWbk } from '#lib/wbk'

await program.process('id')

exitOnMissingInstance(program.instance)

const { getEntitiesFromSitelinks } = getWbk(program)

let { lang } = program
const output = outputFactory(program)

// allow to pass a title without having to put it in ""
let title = program.args.join(' ')

// parse the url if a wikipedia url was provided as title
const wikiPattern = /https?:\/\/(\w{2,8})\.(wik\w+|dbpedia)\.org\/(wiki|resource)\/(.*)/
let site
if (title.match(wikiPattern)) {
  ;[ lang, site, title ] = title
    .replace(wikiPattern, '$1|$2|$4')
    .split('|')
  if (site === 'dbpedia') {
    site = 'wikipedia'
    if (lang === 'www') lang = 'en'
  }
  title = global.decodeURIComponent(title)
}

// Capitalizing the first letter makes it more conveninent for one-word queries
// but quite randome for multi-word queries or just one-word queries
// with title that don't take an capital
// Might need to be removed :/
title = title[0].toUpperCase() + title.slice(1)

const parseIds = ({ body, context }) => {
  const entities = body.entities
  if (entities == null) {
    throw errors_.new('received an empty response', body)
  }
  const ids = Object.keys(entities)
  if (ids.length === 1 && ids[0] !== '-1') {
    const id = ids[0]
    const descriptions = formatDescriptions(entities[id].descriptions)
    output(descriptions, true)
    output(id)
  } else {
    throw errors_.new(`id not found (${JSON.stringify(context)})`, body)
  }
}

const formatDescriptions = descriptions => {
  return map(values(descriptions), 'value')
  .join('\n')
}

site = site || 'wikipedia'

getRedirectedSitelinkTitle(lang, site, title)
.then(async trueTitle => {
  const siteCode = `${lang}${site}`.replace('wikipedia', 'wiki')
  const url = getEntitiesFromSitelinks({ titles: trueTitle, sites: siteCode })
  const body = await get(url)
  return parseIds({ body, context: { title, trueTitle } })
})
.catch(errors_.exit)
