const fs = require('./fs')
const { parse: parseUrl } = require('url')
const getCacheFolderPath = require('../lib/get_cache_folder_path')
const fetchLangProps = require('./fetch_lang_props')

module.exports = program => {
  const { lang, sparqlEndpoint, noCache } = program
  const sparqlEndpointName = getSparqlEndpointPart(sparqlEndpoint)

  return getCacheFolderPath('props')
  .then(propsDir => {
    const file = `${propsDir}/${lang}${sparqlEndpointName}.v2.json`

    if (noCache) return refreshProps(program, file)

    try {
      const propsSync = require(file)
      return Promise.resolve(propsSync)
    } catch (err) {
      return refreshProps(program, file)
    }
  })
}

const refreshProps = (program, file) => {
  return fetch(program, file)
  .then(() => require(file))
}

const fetch = (program, filepath) => {
  return fetchLangProps(program)
  .then(JSON.stringify.bind(JSON))
  .then(fs.writeFile.bind(null, filepath))
}

const getSparqlEndpointPart = (sparqlEndpoint) => {
  if (!sparqlEndpoint) return ''
  const { host } = parseUrl(sparqlEndpoint)
  const hash = require('./hash_string')(sparqlEndpoint)
  return `-${host}-${hash}`
}
