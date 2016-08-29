const wdk = require('wikidata-sdk')
const error_ = require('../lib/error')

module.exports = {
  subject: function (value) {
    // TODO: support properties as subjects
    if (!wdk.isWikidataEntityId(value)) {
      error_.log(`invalid subject: ${value}`)
    } else {
      return `wd:${value}`
    }
  },
  property: function (value) {
    if (!wdk.isWikidataPropertyId(value)) {
      error_.log(`invalid property: ${value}`)
    } else {
      return `wdt:${value}`
    }
  },
  object: function (value) {
    // entity
    if (value[0] === 'Q') return `wd:${value}`
    // property
    if (value[0] === 'P') return `wdt:${value}`
    // number
    if (/^\d+$/.test(value)) return value
    // string
    return `"${value}"`
  }
}
