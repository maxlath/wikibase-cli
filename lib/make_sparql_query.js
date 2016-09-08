const wdk = require('wikidata-sdk')
const lightGet = require('../lib/light_get')
const error_ = require('../lib/error')
const chalk = require('chalk')

module.exports = function (sparql, simplify, debug) {
  const url = wdk.sparqlQuery(sparql)

  if (debug) console.log(chalk.dim('Generated query:'), url)

  return lightGet(url)
  .then((results) => {
    if (simplify) {
      results = wdk.simplifySparqlResults(results)
    }
    console.log(JSON.stringify(results, null, 2))
  })
  .catch(error_.log)
}
