// convert external ids to Wikidata ids

const { chunk } = require('lodash')
const makeSparqlQuery = require('./make_sparql_query')
const program = require('./program')
const output = require('./output')(program)
const wdk = require('wikidata-sdk')
const errors_ = require('./errors')

module.exports = (property, ids) => {
  const useWdIdsAsKeys = wdk.isEntityId(ids[0])
  const sparqlBuilder = useWdIdsAsKeys ? fromWdIds : fromExternalIds
  const sparqlRequests = chunk(ids, 100).map(sparqlBuilder(property))
  const results = initResultsObj(ids)

  getResultsSequentially(sparqlRequests, results, useWdIdsAsKeys)
  .then(output)
  .catch(errors_.exit)
}

const fromWdIds = property => ids => {
  const values = ids.map(id => `(wd:${id})`).join('')

  return `SELECT ?item ?externalId WHERE {
    VALUES (?item) {${values}} .
    ?item wdt:${property} ?externalId .
  }`
}

const fromExternalIds = property => ids => {
  const values = ids.map(id => `("${id}")`).join('')

  return `SELECT ?item ?externalId WHERE {
    VALUES (?externalId) {${values}} .
    ?item wdt:${property} ?externalId .
  }`
}

const initResultsObj = ids => {
  return ids.reduce((obj, id) => {
    obj[id] = []
    return obj
  }, {})
}

const getResultsSequentially = (sparqlRequests, results, useWdIdsAsKeys) => {
  const getNextBatch = () => {
    const sparql = sparqlRequests.shift()
    if (!sparql) return results

    return makeSparqlQuery(sparql)
    .then(addBatchResults(results, useWdIdsAsKeys))
    .then(getNextBatch)
  }
  return getNextBatch()
}

const addBatchResults = (results, useWdIdsAsKeys) => batchResults => {
  batchResults
  .forEach(({ item, externalId }) => {
    if (useWdIdsAsKeys) pushUniq(results[item], externalId)
    else pushUniq(results[externalId], item)
  })
}

const pushUniq = (array, element) => {
  if (array.includes(element)) return
  array.push(element)
}
