const lightGet = require('../lib/light_get')

module.exports = program => {
  const wdk = require('../lib/customized_wdk')(program)
  return (id, lang, sitelinkSuffix) => {
    if (id[0] === 'P') {
      console.error("Wikidata properties don't have sitelinks")
      process.exit(1)
    }

    const url = wdk.customize('getEntities', id, null, 'sitelinks')

    return lightGet(url)
    .then(res => {
      if (res.error) {
        console.error(res.error.info)
        process.exit(1)
      } else {
        const title = res.entities[id].sitelinks[`${lang}${sitelinkSuffix}`].title
        return `https://${lang}.${sitelinkDomain[sitelinkSuffix]}/wiki/${title}`
      }
    })
  }
}

const sitelinkDomain = {
  wiki: 'wikipedia.org'
}
