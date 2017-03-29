// A wrapper of wikidata SDK to customize the Wikibase instance if requested in config
const defaultInstance = 'https://wikidata.org/w/api.php'

module.exports = function (program) {
  const { instance: wikibaseInstance } = program
  const isCustomized = wikibaseInstance && wikibaseInstance !== defaultInstance
  if (!isCustomized) {
    const identity = (url) => url
    return { isCustomized, customize: identity, customizeHost: identity }
  }

  const { parse } = require('url')
  const getExtendedHost = (url) => {
    const { protocol, host } = parse(url)
    return protocol + '//' + host
  }

  const defaultHost = getExtendedHost(defaultInstance)
  const customHost = getExtendedHost(wikibaseInstance)

  // Remove a possible www redirection as it messes with the following substitutions
  const unwww = (url) => url.replace('www.', '')

  const customize = (url) => unwww(url).replace(defaultInstance, wikibaseInstance)
  const customizeHost = (url) => unwww(url).replace(defaultHost, customHost)

  return { isCustomized, customize, customizeHost }
}
