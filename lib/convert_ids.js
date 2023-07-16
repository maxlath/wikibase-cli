// Convert external ids to Wikibase ids

import { chunk, uniq } from 'lodash-es'
import errors_ from './errors.js'
import makeSparqlQuery from './make_sparql_query.js'
import { outputFactory } from './output.js'
import program from './program.js'
import { average } from './utils.js'

const output = outputFactory(program)

export default async (property, ids, fromWdIds) => {
  ids = uniq(ids)
  if (ids.length === 0) return output({})
  const sparqlBuilder = fromWdIds ? fromWbIds : fromExternalIds
  const sparqlRequests = chunk(ids, 1000).map(sparqlBuilder(property))
  const results = initResultsObj(ids)

  getResultsSequentially(sparqlRequests, results, fromWdIds)
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

let count = 0
let totalRequests
const reqTimes = []
let lastReqTime
const start = Date.now()

const getResultsSequentially = (sparqlRequests, results, useWbIdsAsKeys) => {
  totalRequests = sparqlRequests.length
  const getNextBatch = () => {
    count++
    updateStatus(count, lastReqTime, reqTimes)
    const beforeReq = Date.now()
    const sparql = sparqlRequests.shift()
    if (!sparql) return results

    return makeSparqlQuery(sparql)
    .then(addBatchResults(results, useWbIdsAsKeys))
    .then(() => {
      lastReqTime = Date.now() - beforeReq
      reqTimes.push(lastReqTime)
    })
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

const updateStatus = (count, lastReqTime, reqTimes) => {
  const elapsed = Math.round((Date.now() - start) / 10) / 100
  const averageTime = Math.round(average(reqTimes)) / 1000
  const reqTime = pad((lastReqTime / 1000) || 0, 6)
  console.error(`${new Date().toISOString()} | request: ${pad(`${count}/${totalRequests}`, 7)} | last req time: ${reqTime}s | avg req time: ${pad(averageTime, 6)}s | elapsed time : ${pad(elapsed, 7)}s      \r`)
}

const pad = (val, length) => val.toString().padStart(length)
