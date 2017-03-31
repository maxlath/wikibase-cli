const chalk = require('chalk')
const lightGet = require('../lib/light_get')

module.exports = function (program, includeTypes) {
  const { lang } = program
  const wdk = require('../lib/customized_wdk')(program)

  if (!(/^\w{2}$/.test(lang))) {
    const err = new Error(chalk.red(`invalid 2 letters language code: ${lang}`))
    return Promise.reject(err)
  }
  const sparql = require('./queries/all_properties')(lang, includeTypes)
  const url = wdk.customize('sparqlQuery', sparql)

  return lightGet(url)
  .then(formatResults(includeTypes))
}

const formatResults = (wdk, includeTypes) => body => {
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
      type: type.split('#')[1],
      label: noLabelFound ? null : label
    }
  }
}
