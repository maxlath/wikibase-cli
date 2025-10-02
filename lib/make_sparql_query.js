import { simplifySparqlResults, minimizeSimplifiedSparqlResults } from 'wikibase-sdk'
import { grey } from '#lib/chalk'
import errors_ from '#lib/errors'
import { exitOnMissingSparqlEndpoint } from '#lib/exit_on_missing'
import { outputFactory } from '#lib/output'
import program from '#lib/program'
import { customGet, post } from '#lib/request'
import { getWbk } from '#lib/wbk'

export default (sparql, format = 'json') => {
  // JIT require to be sure program.process was already called
  // and program.sparqlEndpoint is set
  exitOnMissingSparqlEndpoint(program.sparqlEndpoint)
  const { sparqlQuery } = getWbk(program)

  if (localFormatsDerivedFromJSON.includes(format)) format = 'json'

  const url = sparqlQuery(sparql).replace('format=json&', '')
  return makeRequest(url, format)
  .then(parseResult(format))
  .catch(errors_.exit)
}

function makeRequest (url, format) {
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

function parseResult (format) {
  const simplifyOption = !program.raw
  const { index: indexAttribute } = program
  return results => {
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
        throw new Error(`Expected a JSON response, got HTML: Are you sure you provided a valid SPARQL endpoint?
Example of a valid SPARQL endpoint: https://query.wikidata.org/sparql
Provided SPARQL endpoint: ${program.sparqlEndpoint}
`)
      } else {
        err.context = { results }
        throw err
      }
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
