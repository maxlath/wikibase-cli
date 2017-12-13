const wdk = require('wikidata-sdk')
const errors_ = require('../lib/error')

module.exports = {
  subject: function (value) {
    if (wdk.isEntityId(value)) {
      return `wd:${value}`
    } else {
      errors_.exit(`invalid subject: ${value}`)
    }
  },
  property: function (value) {
    if (wdk.isPropertyId(value)) {
      return `wdt:${value}`
    } else {
      errors_.exit(`invalid property: ${value}`)
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
    return `"${value}"`.replace(/""/g, '"')
  }
}
