const lightGet = require('./light_get')
const program = require('../lib/program')
const crypto = require('crypto')
const { isCustomized, customizeStrictHost } = require('../lib/custom_wikibase_instance')(program)

var urlBase = 'https://www.wikidata.org/wiki/Special:EntityData'
if (isCustomized) urlBase = customizeStrictHost(urlBase)

module.exports = ids => {
  const getNext = () => {
    const id = ids.shift()
    if (!id) return

    return lightGet(`${urlBase}/${id}.ttl`)
    .then(logUniqueBlocks)
    .then(getNext)
  }

  return getNext()
  .catch(console.error)
}

const blocksHashes = {}

const logUniqueBlocks = ttl => {
  ttl.split('\n\n')
  .forEach(block => {
    const hash = getStringHash(block)
    if (blocksHashes[hash]) return
    console.log(block + '\n')
    blocksHashes[hash] = true
  })
}

const getStringHash = str => crypto.createHash('sha1').update(str).digest('base64')
