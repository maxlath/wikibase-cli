const fs = require('./fs')
const { parse: parseUrl } = require('url')
const getCacheFolderPath = require('../lib/get_cache_folder_path')
const fetchLangProps = require('./fetch_lang_props')

module.exports = function (program, includeTypes = false) {
  const { lang, type, sparqlEndpoint } = program
  // Pass includeTypes as argument instead of through program.type
  // so that different calls in the same session don't conflict
  includeTypes = includeTypes || type
  const filenameOption = includeTypes ? '-with-types' : ''
  const sparqlEndpointName = getSparqlEndpointPart(sparqlEndpoint)

  return getCacheFolderPath('props')
  .then(function (propsDir) {
    const file = `${propsDir}/${lang}${filenameOption}${sparqlEndpointName}.json`
    var propsPromise
    try {
      const propsSync = require(file)
      propsPromise = Promise.resolve(propsSync)
    } catch (err) {
      propsPromise = fetch(program, includeTypes, file).then(() => require(file))
    }
    return propsPromise
  })
}

const fetch = function (program, includeTypes, filepath) {
  return fetchLangProps(program, includeTypes)
  .then(JSON.stringify.bind(JSON))
  .then(fs.writeFile.bind(null, filepath))
}

const getSparqlEndpointPart = function (sparqlEndpoint) {
  if (!sparqlEndpoint) return ''
  return '-' + parseUrl(sparqlEndpoint).host
}
