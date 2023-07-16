// A wrapper of wikidata SDK to customize the Wikibase instance if requested in config
import WBK from 'wikibase-sdk'

export default program => {
  const { instance, sparqlEndpoint } = program
  program.wbk = program.wbk || WBK({ instance, sparqlEndpoint })
  return program.wbk
}
