import { red, yellow } from 'tiny-chalk'
import { simplifySparqlResults } from 'wikibase-sdk'
import { get } from '#lib/request'
import { isValidLang } from '#lib/validate'
import { getWbk } from '#lib/wbk'
import { exitOnMissingSparqlEndpoint } from './exit_on_missing.js'
import queryAllProperties from './queries/all_properties.js'

export default async program => {
  const { lang, sparqlEndpoint } = program
  exitOnMissingSparqlEndpoint(program.sparqlEndpoint)
  const { sparqlQuery } = getWbk(program)

  if (!isValidLang(lang)) throw Error(red(`invalid language: ${lang}`))

  const sparql = queryAllProperties(lang)
  const url = sparqlQuery(sparql)

  try {
    const body = await get(url)
    return simplifySparqlResults(body).reduce(aggregator, {})
  } catch (err) {
    if (err.name === 'SyntaxError' || err.statusCode === 404) {
      console.error(yellow(`Are you sure ${sparqlEndpoint} is a valid SPARQL endpoint?`))
    }
    throw err
  }
}

const aggregator = (map, prop) => {
  const { property } = prop
  let { value, type, label, description, aliases } = property
  // Keep only the properties ids (required for custom wikibase instances)
  value = value.replace(/.*\/entity\//, '')
  const noLabelFound = label === value
  map[value] = {
    label: noLabelFound ? undefined : label,
    type: type.split('#')[1],
    description,
    aliases,
  }
  return map
}
