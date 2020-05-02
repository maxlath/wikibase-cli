const { red, yellow } = require('chalk')
const { get } = require('../lib/request')
const valide = require('../lib/valide')
const exitOnMissing = require('./exit_on_missing')
const WBK = require('../lib/wbk')
const queryAllProperties = require('./queries/all_properties')

module.exports = async program => {
  const { lang, sparqlEndpoint } = program
  exitOnMissing.sparqlEndpoint(program.sparqlEndpoint)
  const { sparqlQuery, simplify } = WBK(program)

  if (!valide.lang(lang)) throw Error(red(`invalid language: ${lang}`))

  const sparql = queryAllProperties(lang)
  const url = sparqlQuery(sparql)

  try {
    const body = await get(url)
    return simplify.sparqlResults(body).reduce(aggregator, {})
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
    aliases
  }
  return map
}
