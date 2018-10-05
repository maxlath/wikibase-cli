// convert external ids to Wikidata ids

const { chunk } = require('lodash')
const makeSparqlQuery = require('./make_sparql_query')
const program = require('./program')
const output = require('./output')(program)
const errors_ = require('./errors')

module.exports = (property, ids) => {
  // Limit batches length to 100 ids at once as we get weird results when asking for more
  const sparqlRequests = chunk(ids, 100).map(buildSparqlRequest(property))
  const results = initResultsObj(ids)

  getResultsSequentially(sparqlRequests, results)
  .then(output)
  .catch(errors_.exit)
}

const buildSparqlRequest = property => ids => {
  const values = ids.map(id => `("${id}")`).join('')

  return `SELECT ?item ?externalId WHERE {
    VALUES (?externalId) {${values}} .
    ?item wdt:${property} ?externalId .
  }`
}

const initResultsObj = ids => {
  return ids.reduce((obj, id) => {
    // Set all ids values to null so that not found ids will end up with that null value
    obj[id] = null
    return obj
  }, {})
}

const getResultsSequentially = (sparqlRequests, results) => {
  const getNextBatch = () => {
    const sparql = sparqlRequests.shift()
    if (!sparql) return results

    return makeSparqlQuery(sparql)
    .then(addBatchResults(results))
    .then(getNextBatch)
  }
  return getNextBatch()
}

const addBatchResults = results => batchResults => {
  batchResults
  .forEach(({ item, externalId }) => {
    results[externalId] = item
  })
}
