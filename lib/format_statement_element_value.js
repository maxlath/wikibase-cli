const { isEntityId, isPropertyId } = require('wikibase-sdk')
const errors_ = require('../lib/errors')

module.exports = {
  subject: value => {
    if (isEntityId(value)) return `wd:${value}`
    if (isUrlValue(value)) return formatUrlValue(value)
    errors_.exit(`invalid subject: ${value}`)
  },
  property: value => {
    if (isPropertyId(value)) return `wdt:${value}`
    if (isUrlValue(value)) return formatUrlValue(value)
    errors_.exit(`invalid property: ${value}`)
  },
  object: value => {
    // entity
    if (value[0] === 'Q') return `wd:${value}`
    // property
    if (value[0] === 'P') return `wdt:${value}`
    // number
    if (/^\d+(\.\d+)?$/.test(value)) return value
    // URL
    if (isUrlValue(value)) return formatUrlValue(value)
    // string
    return `"${value}"`.replace(/""/g, '"')
  }
}

const isUrlValue = value => /^<?(https?|ftp):\/\/.+/.test(value)
const formatUrlValue = value => {
  if (/^<.+>/.test(value)) return value
  else return `<${value}>`
}
