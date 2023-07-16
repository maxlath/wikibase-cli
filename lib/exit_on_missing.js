import { red } from '#lib/chalk'

const missingInstance = `A Wikibase instance should be specificed.

This can be done in config, ex:
  $  wb config instance https://www.wikidata.org

or with the -i,--instance command option:
  $  wb label Q1 -i https://www.wikidata.org`

const missingSparqlEndpoint = `A SPARQL endpoint should be specificed.

This can be done in config, ex:
  $  wb config sparql-endpoint https://query.wikidata.org/sparql

or with the -e,--sparql-endpoint command option:
  $  wb sparql ./my_query.sparql -e https://query.wikidata.org/sparql`

export function exitOnMissingInstance (instance) {
  if (instance) return
  console.error(red(missingInstance))
  process.exit(1)
}

export function exitOnMissingSparqlEndpoint (sparqlEndpoint) {
  if (sparqlEndpoint) return
  console.error(red(missingSparqlEndpoint))
  process.exit(1)
}
