const bluebird = require('bluebird')
const writeFileAsync = bluebird.promisify(require('fs').writeFile)

const fetchLangProps = require('./fetch_lang_props')

module.exports = function (lang) {
  const file = `${lang}.json`
  console.log('__dirname:', __dirname)
  const dir = __dirname.replace('lib', 'props')
  console.log('dir:', dir)

  try {
    propsSync = requireLangProps(lang)
    var propsPromise = Promise.resolve( propsSync )
  } catch (err) {
    // console.log(`missing '${lang}' props: fetching`)
    var propsPromise = fetch(lang, `${dir}/${file}`)
      .then(() => requireLangProps(lang))
  }
  return propsPromise
}

const fetch = (lang, filepath) => {
  return fetchLangProps(lang)
  .then((res) => JSON.stringify(res, null, 2) )
  .then(writeFileAsync.bind(null, filepath))
  // .tap(() => console.log(`${lang} props fetched`.green))
}

const requireLangProps = (lang) => require(`../props/${lang}.json`)
