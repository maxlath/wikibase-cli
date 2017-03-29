// A wrapper of wikidata SDK to customize the Wikibase instance if requested in config
const wdk = require('wikidata-sdk')
const customWikibaseInstance = require('./custom_wikibase_instance')

module.exports = function (program) {
  const { hasCustomInstance, customize } = customWikibaseInstance(program)
  return function (fnName, ...args) {
    const url = wdk[fnName].apply(null, args)
    return hasCustomInstance ? customize(url) : url
  }
}
