const fs = require('./fs')
const { URL } = require('url')
const getCacheFolderPath = require('../lib/get_cache_folder_path')
const fetchLangProps = require('./fetch_lang_props')

module.exports = async program => {
  const { lang, sparqlEndpoint, noCache } = program
  const sparqlEndpointName = getSparqlEndpointPart(sparqlEndpoint)

  const propsDir = await getCacheFolderPath('props')
  const file = `${propsDir}/${lang}${sparqlEndpointName}.v2.json`

  if (noCache) return refreshProps(program, file)

  try {
    const propsSync = require(file)
    return propsSync
  } catch (err) {
    return refreshProps(program, file)
  }
}

const refreshProps = async (program, file) => {
  await fetchAndSaveProps(program, file)
  return require(file)
}

const fetchAndSaveProps = async (program, filepath) => {
  const props = await fetchLangProps(program)
  return fs.writeFile(filepath, JSON.stringify(props))
}

const getSparqlEndpointPart = sparqlEndpoint => {
  if (!sparqlEndpoint) return ''
  const { host } = new URL(sparqlEndpoint)
  const hash = require('./hash_string')(sparqlEndpoint)
  return `-${host}-${hash}`
}
