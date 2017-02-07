const chalk = require('chalk')
const lightGet = require('../lib/light_get')
const wdk = require('wikidata-sdk')

module.exports = function (lang, includeTypes) {
  if (!(/^\w{2}$/.test(lang))) {
    const err = new Error(chalk.red(`invalid 2 letters language code: ${lang}`))
    return Promise.reject(err)
  }
  const sparql = require('./queries/all_properties')(lang, includeTypes)
  const url = wdk.sparqlQuery(sparql)

  return lightGet(url)
  .then(formatResults.bind(null, includeTypes))
}

function formatResults (includeTypes, body) {
  const map = {}
  const parser = includeTypes ? ParserWithTypes(map) : SimpleParser(map)
  wdk.simplifySparqlResults(body).forEach(parser)
  return map
}

function SimpleParser (map) {
  return function simpleParser (prop) {
    const { value, label } = prop.property
    // When the label is missing, Wikidata Query returns the property id as label
    const noLabelFound = value === label
    map[value] = noLabelFound ? null : label
  }
}

function ParserWithTypes (map) {
  return function parserWithTypes (prop) {
    const { property, propertyType: type } = prop
    const { value, label } = property
    const noLabelFound = value === label
    map[value] = {
      label: noLabelFound ? null : label,
      type: type.split('#')[1]
    }
  }
}
