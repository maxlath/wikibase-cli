const { get } = require('../lib/request')
const exitOnMissing = require('../lib/exit_on_missing')
const errors_ = require('../lib/errors')

module.exports = program => {
  exitOnMissing.instance(program.instance)
  const { getEntities } = require('../lib/wbk')(program)
  return async (id, lang, sitelinkSuffix) => {
    if (id[0] === 'P') {
      console.error("Wikibase properties don't have sitelinks")
      process.exit(1)
    }

    const url = getEntities({ ids: id, props: [ 'sitelinks' ] })

    const { entities } = await get(url)
    const entity = entities[id]
    if (!entity || entity.missing === '') throw errors_.new('entity not found', { id, lang, sitelinkSuffix })
    const sitelink = entity.sitelinks[`${lang}${sitelinkSuffix}`]
    if (!sitelink) throw errors_.new('sitelink not found', { id, lang, sitelinkSuffix })
    const domain = sitelinkDomain[sitelinkSuffix]
    const formattedTitle = formatTitle(sitelink.title)
    return `https://${lang}.${domain}/wiki/${formattedTitle}`
  }
}

const sitelinkDomain = {
  wiki: 'wikipedia.org'
}

const formatTitle = title => {
  title = title.replace(/\s/g, '_')
  return fixedEncodeURIComponent(title)
}

// encodeURIComponent ignores !, ', (, ), and *
// cf https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#Description
const fixedEncodeURIComponent = str => {
  return encodeURIComponent(str).replace(/[!'()*]/g, encodeCharacter)
}

const encodeCharacter = c => '%' + c.charCodeAt(0).toString(16)
