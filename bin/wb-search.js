#!/usr/bin/env node
import { padEnd } from 'lodash-es'
import { red, grey } from '#lib/chalk'
import { entityDataParser } from '#lib/entity_data_parser'
import { exitOnMissingInstance } from '#lib/exit_on_missing'
import parseEntityType from '#lib/parse_entity_type'
import program from '#lib/program'
import { get } from '#lib/request'
import { isValidLang } from '#lib/validate'
import wbk from '#lib/wbk'

await program
.option('-p, --properties <properties>', 'request additional properties (separated by a comma) (implies verbose mode)')
.option('-t, --type <type>', 'customize type: i|item, p|property, l|lexeme, f|form, s|sense (Default: item)')
.option('-n, --limit <num>', 'set a custom limit (defaults to 10)')
.option('--cirrus', 'use Cirrus search')
.process('search')

// Accept several words without requiring those to be joined by quotes
const search = program.args.join(' ')

if (!(search && search.length > 0)) program.helpAndExit(0)

let { lang: language, json, verbose, properties, limit, type, cirrus } = program
limit = limit || 20
if (typeof limit === 'string') limit = parseInt(limit)

if (properties) program.verbose = verbose = true

if (!isValidLang(language)) {
  console.error(red(`invalid language: ${language}`))
  process.exit(1)
}
exitOnMissingInstance(program.instance)

const { searchEntities, cirrusSearchPages } = wbk(program)

type = parseEntityType(type)

let url
if (cirrus) {
  url = cirrusSearchPages({
    search,
    srprop: 'snippet|titlesnippet|sectiontitle',
    limit,
  })
} else {
  url = searchEntities({
    search,
    language,
    // Fetch more in case we need to filter-out some results
    limit: limit + 10,
    type,
  })
}

const dropMarkup = str => {
  return str
  .replace(/<span class="searchmatch">/g, '')
  .replace(/<\/span>/g, '')
}

get(url)
.then(async body => {
  const { error, search, query } = body

  if (error) {
    console.error('API error response: ' + error.info)
    process.exit(1)
  }

  let results = search || query.search

  results = results.slice(0, limit)

  if (cirrus) {
    results.forEach(result => {
      result.id = result.title
      result.label = dropMarkup(result.titlesnippet)
      result.description = dropMarkup(result.snippet.split('\n')[0])
    })
  }

  if (json) {
    console.log(JSON.stringify(results, null, 2))
    return
  }

  const ids = results.map(result => result.id || result.title)

  if (ids.length === 0) {
    console.error('no result')
    process.exit(1)
  }

  // In verbose mode, use the summary format
  // to get a summary of each entity, possibly with additional properties
  if (verbose) {
    // Override the verbose flag so that search results aren't displayed
    // in the summary verbose format, only in the normal, short, summary format
    program.verbose = false
    const { summaryParser } = await import('#lib/summary_parser')
    entityDataParser({ ids, parser: summaryParser })
  } else if (cirrus) {
    results
    .forEach(result => {
      let { id, label, description } = result
      // Known case: when search with haswbstatement
      if (!label) {
        label = description
        description = ''
      }
      let text = padEnd(id, 11) + label
      if (description && description.length > 0) text += ' ' + grey(description)
      console.log(text)
    })
  } else {
    results
    .forEach(result => {
      const { id, label, description } = result
      let text = padEnd(id, 11) + label
      if (description && description.length > 0) text += ' ' + grey(description)
      console.log(text)
    })
  }
})
