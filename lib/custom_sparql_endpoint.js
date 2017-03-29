const defaultEndpoint = 'https://query.wikidata.org/sparql'

module.exports = function (program) {
  const { 'sparql-endpoint': sparqlEndpoint } = program
  const isCustomized = sparqlEndpoint && sparqlEndpoint !== defaultEndpoint
  const customize = (url) => url.replace(defaultEndpoint, sparqlEndpoint)
  return { isCustomized, customize }
}
