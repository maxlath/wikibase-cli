const fs = require('./fs')
const getCacheFolderPath = require('../lib/get_cache_folder_path')
const fetchLangProps = require('./fetch_lang_props')

module.exports = function (lang) {
  return getCacheFolderPath('props')
  .then(function (propsDir) {
    const file = `${propsDir}/${lang}.json`
    var propsPromise
    try {
      const propsSync = require(file)
      propsPromise = Promise.resolve(propsSync)
    } catch (err) {
      propsPromise = fetch(lang, file).then(() => require(file))
    }
    return propsPromise
  })
}

const fetch = (lang, filepath) => {
  return fetchLangProps(lang)
  .then((res) => JSON.stringify(res, null, 2))
  .then(fs.writeFile.bind(null, filepath))
}
