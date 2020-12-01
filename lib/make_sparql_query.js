const { customGet, post } = require('../lib/request')
const errors_ = require('../lib/errors')
const { grey } = require('chalk')
const program = require('../lib/program')
const output = require('../lib/output')(program)
const { simplify } = require('wikibase-sdk')

const simplifyOption = !program.raw
const { index: indexAttribute } = program

module.exports = (sparql, format = 'json') => {
  // JIT require to be sure program.process was already called
  // and program.sparqlEndpoint is set
  require('../lib/exit_on_missing').sparqlEndpoint(program.sparqlEndpoint)
  const { sparqlQuery } = require('../lib/wbk')(program)

  if (localFormatsDerivedFromJSON.includes(format)) format = 'json'

  const url = sparqlQuery(sparql).replace('format=json&', '')
  return makeRequest(url, format)
  .then(parseResult(format))
  .catch(errors_.exit)
}

const makeRequest = (url, format) => {
  // Avoid making a POST request when not necessary as those aren't cached
  // see https://www.mediawiki.org/wiki/Wikidata_Query_Service/User_Manual#SPARQL_endpoint
  if (url.length < 5000) {
    output(`${grey('Generated get query:')} ${url}`, true, true)
    return customGet({
      url,
      headers: {
        Accept: formatAcceptHeader[format]
      }
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
      }
    })
  }
}

const localFormatsDerivedFromJSON = [
  'table'
]

// Source: https://www.mediawiki.org/wiki/Wikidata_Query_Service/User_Manual#Supported_formats
const formatAcceptHeader = {
  xml: 'application/sparql-results+xml',
  json: 'application/sparql-results+json',
  tsv: 'text/tab-separated-values',
  csv: 'text/csv',
  binrdf: 'application/x-binary-rdf-results-table',
}

const parseResult = format => results => {
  if (format === 'json' && simplifyOption) {
    results = simplify.sparqlResults(results, { minimize: true })
    if (indexAttribute) results = indexBy(results, indexAttribute)
  }
  return results
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
