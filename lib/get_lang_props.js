const bluebird = require('bluebird')
const path = require('path')
const writeFileAsync = bluebird.promisify(require('fs').writeFile)

const fetchLangProps = require('./fetch_lang_props')

module.exports = function (lang) {
  const file = `${lang}.json`
  const dir = path.resolve(__dirname, '../props')

  var propsPromise

  try {
    const propsSync = requireLangProps(lang)
    propsPromise = Promise.resolve(propsSync)
  } catch (err) {
    propsPromise = fetch(lang, `${dir}/${file}`)
      .then(() => requireLangProps(lang))
  }
  return propsPromise
}

const fetch = (lang, filepath) => {
  return fetchLangProps(lang)
  .then((res) => JSON.stringify(res, null, 2))
  .then(writeFileAsync.bind(null, filepath))
}

const requireLangProps = (lang) => require(`../props/${lang}.json`)
