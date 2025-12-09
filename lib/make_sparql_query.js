import { simplifySparqlResults, minimizeSimplifiedSparqlResults } from 'wikibase-sdk'
import { grey } from '#lib/chalk'
import errors_ from '#lib/errors'
import { exitOnMissingSparqlEndpoint } from '#lib/exit_on_missing'
import { outputFactory } from '#lib/output'
import program from '#lib/program'
import { customGet, post } from '#lib/request'
import { getWbk } from '#lib/wbk'
import { addWellknownPrefixes } from './queries/add_prefixes.js'

export async function makeSparqlQuery (sparql, format = 'json') {
  const { sparqlEndpoint } = program
  // JIT require to be sure program.process was already called
  // and program.sparqlEndpoint is set
  exitOnMissingSparqlEndpoint(sparqlEndpoint)

  if (localFormatsDerivedFromJSON.includes(format)) format = 'json'

  const engine = getCustomSparqlEngine(sparqlEndpoint)

  try {
    if (engine === 'qlever') {
      return await makeQleverSparqlQuery(sparqlEndpoint, sparql, format)
    } else {
      return await makeBlazeGraphSparqlQuery(sparql, format)
    }
  } catch (err) {
    errors_.exit(err)
  }
}

async function makeBlazeGraphSparqlQuery (sparql, format) {
  const { sparqlQuery } = getWbk(program)
  const url = sparqlQuery(sparql).replace('format=json&', '')
  const results = await makeBlazeGraphRequest(url, format)
  return parseResults(results, format)
}

async function makeBlazeGraphRequest (url, format) {
  const output = outputFactory(program)
  const acceptHeader = formatAcceptHeader[format]
  if (!acceptHeader) throw new Error(`unknown format: ${format}`)
  // Avoid making a POST request when not necessary as those aren't cached
  // see https://www.mediawiki.org/wiki/Wikidata_Query_Service/User_Manual#SPARQL_endpoint
  if (url.length < 5000) {
    output(`${grey('Generated get query:')} ${url}`, true, true)
    return customGet({
      url,
      headers: {
        Accept: formatAcceptHeader[format],
      },
      parseResponseAsJson: format === 'json',
    })
  } else {
    const [ postUrl, urlencodedSparql ] = url.split('?')
    output(`${grey('Generated post body:')} ${urlencodedSparql}`, true, true)
    return post({
      url: postUrl,
      body: new URLSearchParams(urlencodedSparql).get('query'),
      headers: {
        'Content-type': 'application/sparql-query',
        Accept: formatAcceptHeader[format],
      },
      parseResponseAsJson: format === 'json',
    })
  }
}

const localFormatsDerivedFromJSON = [
  'table',
  'inline',
]

// Source: https://www.mediawiki.org/wiki/Wikidata_Query_Service/User_Manual#Supported_formats
const formatAcceptHeader = {
  xml: 'application/sparql-results+xml',
  json: 'application/sparql-results+json',
  tsv: 'text/tab-separated-values',
  csv: 'text/csv',
  binrdf: 'application/x-binary-rdf-results-table',
}

function parseResults (results, format) {
  const simplifyOption = !program.raw
  const { index: indexAttribute, sparqlEndpoint } = program
  try {
    if (format === 'json' && simplifyOption) {
      results = minimizeSimplifiedSparqlResults(simplifySparqlResults(results))
      if (indexAttribute) results = indexBy(results, indexAttribute)
    }
    if (format === 'csv') {
      results = results.replace(/\r\n/g, '\n')
    }
    return results
  } catch (err) {
    if (err.name === 'SyntaxError' && looksLikeHtml(results)) {
      if (sparqlEndpoint === 'https://commons-query.wikimedia.org/sparql') {
        throw new Error(`${sparqlEndpoint} returned an invalid response (HTML), probably due to its restrictive access policy, see https://commons.wikimedia.org/wiki/Commons:SPARQL_query_service/API_endpoint`)
      } else {
        throw new Error(`Expected a JSON response, got HTML: Are you sure you provided a valid SPARQL endpoint?
  Example of a valid SPARQL endpoint: https://query.wikidata.org/sparql
  Provided SPARQL endpoint: ${sparqlEndpoint}
  `)
      }
    } else {
      err.context = { results }
      throw err
    }
  }
}

const indexBy = (array, attribute) => {
  const index = {}
  array.forEach(obj => {
    let key = obj[attribute]
    delete obj[attribute]
    if (typeof key === 'object' && key.value) key = key.value
    // Not setting the obj as direct value, as several obj might share the same key
    if (!index[key]) index[key] = [ obj ]
    else index[key].push(obj)
  })
  return index
}

function looksLikeHtml (results) {
  return typeof results === 'string' && /(DOCTYPE html|<html)/.test(results)
}

function getCustomSparqlEngine (sparqlEndpoint) {
  if (sparqlEndpoint.includes('qlever')) return 'qlever'
}

async function makeQleverSparqlQuery (sparqlEndpoint, sparql, format) {
  const output = outputFactory(program)
  const { origin, pathname } = new URL(sparqlEndpoint)
  const apiBase = pathname.startsWith('/api') ? sparqlEndpoint : `${origin}/api${pathname}`
  const action = qleverActionByFormat[format]
  sparql = addWellknownPrefixes(sparql)
  const url = `${apiBase}?query=${encodeURIComponent(sparql)}&action=${action}`
  output(`${grey('Generated get query:')} ${url}`, true, true)
  const results = await customGet({ url, parseResponseAsJson: format === 'json' })
  return parseResults(results, format)
}

const qleverActionByFormat = {
  json: 'json_export',
  csv: 'csv_export',
}
