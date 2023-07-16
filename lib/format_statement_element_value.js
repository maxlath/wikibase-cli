import { isEntityId, isPropertyId } from 'wikibase-sdk'
import errors_ from '#lib/errors'

const prefixedProperty = prefix => value => {
  if (isPropertyId(value)) return `${prefix}:${value}`
  if (isUrlValue(value)) return formatUrlValue(value)
  errors_.exit(`invalid property: ${value}`)
}

const object = value => {
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

export default {
  subject: value => {
    if (isEntityId(value)) return `wd:${value}`
    if (isUrlValue(value)) return formatUrlValue(value)
    errors_.exit(`invalid subject: ${value}`)
  },

  property: prefixedProperty('wdt'),
  pProperty: prefixedProperty('p'),
  psProperty: prefixedProperty('ps'),
  pqProperty: prefixedProperty('pq'),

  object,
  pqObject: object,
}

const isUrlValue = value => /^<?(https?|ftp):\/\/.+/.test(value)
const formatUrlValue = value => {
  if (/^<.+>/.test(value)) return value
  else return `<${value}>`
}
