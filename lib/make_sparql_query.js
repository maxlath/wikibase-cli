const wdk = require('wikidata-sdk')
const lightGet = require('../lib/light_get')
const error_ = require('../lib/error')
const { dim } = require('chalk')
const program = require('../lib/program')
const output = require('../lib/output')(program)

const simplify = !program.raw

module.exports = function (sparql) {
  const url = wdk.sparqlQuery(sparql)

  output(`${dim('Generated query:')} ${url}`, true, true)

  return lightGet(url)
  .then((results) => {
    if (simplify) results = wdk.simplifySparqlResults(results)
    output(results)
  })
  .catch(error_.log)
}
