const lightGet = require('../lib/light_get')

module.exports = program => {
  const { getEntities } = require('../lib/wbk')(program)
  return (id, lang, sitelinkSuffix) => {
    if (id[0] === 'P') {
      console.error("Wikibase properties don't have sitelinks")
      process.exit(1)
    }

    const url = getEntities({ ids: id, props: [ 'sitelinks' ] })

    return lightGet(url)
    .then(res => {
      if (res.error) {
        console.error(res.error.info)
        process.exit(1)
      } else {
        const title = res.entities[id].sitelinks[`${lang}${sitelinkSuffix}`].title
        const domain = sitelinkDomain[sitelinkSuffix]
        return `https://${lang}.${domain}/wiki/${title}`
      }
    })
  }
}

const sitelinkDomain = {
  wiki: 'wikipedia.org'
}
