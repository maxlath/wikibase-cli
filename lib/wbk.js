// A wrapper of wikidata SDK to customize the Wikibase instance if requested in config
const WBK = require('wikibase-sdk')

module.exports = program => {
  const { instance, sparqlEndpoint } = program
  return WBK({ instance, sparqlEndpoint })
}
