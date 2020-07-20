// Convert external ids to Wikibase ids

const { chunk, uniq } = require('lodash')
const makeSparqlQuery = require('./make_sparql_query')
const program = require('./program')
const output = require('./output')(program)
const errors_ = require('./errors')
const getEntities = require('./get_entities')
const supportedDatatypes = [
  'external-id',
  'wikibase-item'
]

module.exports = async (property, ids) => {
  const entities = await getEntities({ ids: [ property ], props: 'info' })
  const propertyData = entities[property]
  if (!propertyData) {
    errors_.exitMessage(`property not found: ${program.instance}/entity/${property}`)
  }

  const { datatype: propertyDatatype } = propertyData
  if (!supportedDatatypes.includes(propertyDatatype)) {
    errors_.exitMessage(`property datatype isn't supported: ${JSON.stringify({ propertyDatatype, supportedDatatypes })}`)
  }

  const useWbIdsAsKeys = propertyDatatype === 'wikibase-item'

  ids = uniq(ids)
  if (ids.length === 0) return output({})
  const sparqlBuilder = useWbIdsAsKeys ? fromWbIds : fromExternalIds
  const sparqlRequests = chunk(ids, 100).map(sparqlBuilder(property))
  const results = initResultsObj(ids)

  getResultsSequentially(sparqlRequests, results, useWbIdsAsKeys)
  .then(output)
  .catch(errors_.exit)
}

const fromWbIds = property => ids => {
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

const getResultsSequentially = (sparqlRequests, results, useWbIdsAsKeys) => {
  const getNextBatch = () => {
    const sparql = sparqlRequests.shift()
    if (!sparql) return results

    return makeSparqlQuery(sparql)
    .then(addBatchResults(results, useWbIdsAsKeys))
    .then(getNextBatch)
  }
  return getNextBatch()
}

const addBatchResults = (results, useWbIdsAsKeys) => batchResults => {
  batchResults
  .forEach(({ item, externalId }) => {
    if (useWbIdsAsKeys) pushUniq(results[item], externalId)
    else pushUniq(results[externalId], item)
  })
}

const pushUniq = (array, element) => {
  if (array.includes(element)) return
  array.push(element)
}
