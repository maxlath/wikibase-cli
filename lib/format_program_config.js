export function formatProgramConfig (program) {
  program.sparqlEndpoint = formatSparqlEndpoint(program.sparqlEndpoint)
}

function formatSparqlEndpoint (sparqlEndpoint) {
  if (!sparqlEndpoint) return
  const { host } = new URL(sparqlEndpoint)

  // Ignores any possible endpoint mistake (ex: missing the "/sparql" part)
  // Supports the various subdomains
  // See https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/WDQS_graph_split#Endpoints
  if (host.endsWith('.wikidata.org')) return `https://${host}/sparql`
  if (host === 'commons-query.wikimedia.org') return 'https://commons-query.wikimedia.org/sparql'

  return sparqlEndpoint
}
