const chalk = require('chalk')
const lightGet = require('../lib/light_get')
const wdk = require('wikidata-sdk')

module.exports = function (lang) {
  if (!(/^\w{2}$/.test(lang))) {
    const err = new Error(chalk.red(`invalid 2 letters language code: ${lang}`))
    return Promise.reject(err)
  }
  const sparql = require('./queries/all_properties')(lang)
  const url = wdk.sparqlQuery(sparql)

  return lightGet(url)
  .then(formatResults)
}

function formatResults (body) {
  const map = {}
  wdk.simplifySparqlResults(body)
  .forEach((prop) => {
    const value = prop.property.value
    const label = prop.property.label
    // when the label is missing, we get the property id instead
    if (value !== label) {
      map[value] = label
    } else {
      map[value] = null
    }
  })
  return map
}
