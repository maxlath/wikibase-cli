const { get } = require('../lib/request')
const exitOnMissing = require('../lib/exit_on_missing')
const errors_ = require('../lib/errors')

module.exports = program => {
  exitOnMissing.instance(program.instance)
  const { getEntities } = require('../lib/wbk')(program)
  return (id, lang, sitelinkSuffix) => {
    if (id[0] === 'P') {
      console.error("Wikibase properties don't have sitelinks")
      process.exit(1)
    }

    const url = getEntities({ ids: id, props: [ 'sitelinks' ] })

    return get(url)
    .then(res => {
      const entity = res.entities[id]
      if (!entity || entity.missing === '') throw errors_.new('entity not found', { id, lang, sitelinkSuffix })
      const sitelink = entity.sitelinks[`${lang}${sitelinkSuffix}`]
      if (!sitelink) throw errors_.new('sitelink not found', { id, lang, sitelinkSuffix })
      const domain = sitelinkDomain[sitelinkSuffix]
      return `https://${lang}.${domain}/wiki/${sitelink.title}`
    })
  }
}

const sitelinkDomain = {
  wiki: 'wikipedia.org'
}
