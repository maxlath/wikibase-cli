const { isEntityId, isPropertyId } = require('wikibase-sdk')
const errors_ = require('../lib/errors')

module.exports = {
  subject: value => {
    if (isEntityId(value)) {
      return `wd:${value}`
    } else {
      errors_.exit(`invalid subject: ${value}`)
    }
  },
  property: value => {
    if (isPropertyId(value)) {
      return `wdt:${value}`
    } else {
      errors_.exit(`invalid property: ${value}`)
    }
  },
  object: value => {
    // entity
    if (value[0] === 'Q') return `wd:${value}`
    // property
    if (value[0] === 'P') return `wdt:${value}`
    // number
    if (/^\d+$/.test(value)) return value
    // URL
    if (/^<?(https?|ftp):\/\/.+/.test(value)) {
      if (/^<.+>/.test(value)) return value
      else return `<${value}>`
    }
    // string
    return `"${value}"`.replace(/""/g, '"')
  }
}
