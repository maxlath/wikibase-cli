// A wrapper of wikidata SDK to customize the Wikibase instance if requested in config
const wdk = require('wikidata-sdk')
const sparqlFunctions = [ 'sparqlQuery' ]

module.exports = program => {
  wdk.customize = (fnName, ...args) => {
    const urls = wdk[fnName].apply(null, args)
    const isSparqlFunction = sparqlFunctions.includes(fnName)
    const customizer = isSparqlFunction ? 'sparql_endpoint' : 'wikibase_instance'
    const { isCustomized, customize } = require(`./custom_${customizer}`)(program)
    if (!isCustomized) return urls
    if (typeof urls === 'string') return customize(urls)
    return urls.map(customize)
  }
  return wdk
}
