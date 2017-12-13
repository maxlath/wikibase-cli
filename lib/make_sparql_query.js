const lightGet = require('../lib/light_get')
const errors_ = require('../lib/error')
const { dim } = require('chalk')
const program = require('../lib/program')
const output = require('../lib/output')(program)
const wdk = require('../lib/customized_wdk')(program)

const simplify = !program.raw
const { index: indexAttribute } = program

module.exports = function (sparql) {
  const url = wdk.customize('sparqlQuery', sparql)

  output(`${dim('Generated query:')} ${url}`, true, true)

  return lightGet(url)
  .then(results => {
    if (simplify) {
      results = wdk.simplifySparqlResults(results)
      if (indexAttribute) results = indexBy(results, indexAttribute)
    }
    output(results)
  })
  .catch(errors_.exit)
}

const indexBy = (array, attribute) => {
  const index = {}
  array.forEach(obj => {
    let key = obj[attribute]
    if (typeof key === 'object' && key.value) key = key.value
    index[key] = obj
  })
  return index
}
