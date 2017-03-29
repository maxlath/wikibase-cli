// A wrapper of wikidata SDK to customize the Wikibase instance if requested in config
const wdk = require('wikidata-sdk')
const sparqlFunctions = [ 'sparqlQuery' ]

module.exports = (program) => (fnName, ...args) => {
  const url = wdk[fnName].apply(null, args)
  const isSparqlFunction = sparqlFunctions.includes(fnName)
  const customizer = isSparqlFunction ? 'sparql_endpoint' : 'wikibase_instance'
  const { isCustomized, customize } = require(`./custom_${customizer}`)(program)
  return isCustomized ? customize(url) : url
}
