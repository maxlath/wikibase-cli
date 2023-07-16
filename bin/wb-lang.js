#!/usr/bin/env node
import wdLang from 'wikidata-lang'
import { findMatchingLang, formatLangs } from '#lib/matching_langs'
import { outputFactory } from '#lib/output'
import program from '#lib/program'

await program.process('lang')

const output = outputFactory(program)

const { args, json } = program

const input = args[0]

let langData
if (input.match(/Q\d+/) != null) {
  const wdId = input.match(/Q\d+/)[0]
  langData = wdLang.byWdId[wdId]
  if (langData && !json) langData = langData.code
} else {
  langData = wdLang.byCode[input.toLowerCase()]
  if (langData && !json) langData = langData.wd
}

if (langData != null) {
  output(langData)
} else {
  let matchingLangs = findMatchingLang(input)
  if (matchingLangs.length > 0) {
    if (!json) matchingLangs = formatLangs(matchingLangs)
    output(matchingLangs)
  } else {
    console.error("couldn't find a language from input", input)
  }
}
