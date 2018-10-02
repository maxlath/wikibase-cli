const lightGet = require('./light_get')
const program = require('../lib/program')
const { isCustomized, customizeStrictHost } = require('../lib/custom_wikibase_instance')(program)

var urlBase = 'https://www.wikidata.org/wiki/Special:EntityData'
if (isCustomized) urlBase = customizeStrictHost(urlBase)

module.exports = ids => {
  var isFirst = true

  const getNext = () => {
    const id = ids.shift()
    if (!id) return

    return lightGet(`${urlBase}/${id}.ttl`)
    .then(body => {
      if (isFirst) isFirst = false
      else body = removePrefixes(body)
      console.log(body)
    })
    .then(getNext)
  }

  return getNext()
  .catch(console.error)
}

const removePrefixes = ttl => {
  return ttl
    .split('\n')
    .filter(line => !line.startsWith('@prefix'))
    .join('\n')
}
