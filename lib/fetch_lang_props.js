const { red } = require('chalk')
const lightGet = require('../lib/light_get')
const valide = require('../lib/valide')

module.exports = program => {
  const { lang } = program
  require('../lib/exit_on_missing').sparqlEndpoint(program.sparqlEndpoint)
  const { sparqlQuery, simplify } = require('../lib/wbk')(program)

  if (!valide.lang(lang)) {
    const err = new Error(red(`invalid language: ${lang}`))
    return Promise.reject(err)
  }
  const sparql = require('./queries/all_properties')(lang)
  const url = sparqlQuery(sparql)

  return lightGet(url)
  .then(body => simplify.sparqlResults(body).reduce(aggregator, {}))
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
