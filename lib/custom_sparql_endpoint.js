const defaultEndpoint = 'https://query.wikidata.org/sparql'

module.exports = program => {
  const { sparqlEndpoint } = program
  const isCustomized = sparqlEndpoint && sparqlEndpoint !== defaultEndpoint
  const customize = url => url.replace(defaultEndpoint, sparqlEndpoint)
  return { isCustomized, customize }
}
