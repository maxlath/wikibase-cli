const fs = require('./fs')
const getCacheFolderPath = require('../lib/get_cache_folder_path')
const fetchLangProps = require('./fetch_lang_props')

module.exports = function (lang, includeTypes) {
  return getCacheFolderPath('props')
  .then(function (propsDir) {
    const filenameOption = includeTypes ? '-with-types' : ''
    const file = `${propsDir}/${lang}${filenameOption}.json`
    var propsPromise
    try {
      const propsSync = require(file)
      propsPromise = Promise.resolve(propsSync)
    } catch (err) {
      propsPromise = fetch(lang, includeTypes, file).then(() => require(file))
    }
    return propsPromise
  })
}

const fetch = function (lang, includeTypes, filepath) {
  return fetchLangProps(lang, includeTypes)
  .then(JSON.stringify.bind(JSON))
  .then(fs.writeFile.bind(null, filepath))
}
