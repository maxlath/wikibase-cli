import program from './program.js'
import { propTypes } from './properties.js'

const normalizeTypeName = name => name.replace(/-/g, '').toLowerCase()
const normalizedTypesNames = Object.keys(propTypes).map(normalizeTypeName)

export default (pattern, includeTypes) => {
  const { type } = program
  let normalizedType, isKnownType
  // If --type is called without argument, `type` will be a boolean
  if (typeof type === 'string') {
    normalizedType = normalizeTypeName(type)
    isKnownType = normalizedTypesNames.includes(normalizedType)
  }
  if (!(pattern && pattern.length > 0)) {
    if (normalizedType) {
      // Consider that what was passed as a type argument was actually a pattern
      if (!isKnownType) pattern = type
    } else {
      return
    }
  }

  if (includeTypes && isKnownType) {
    return propData => normalizeTypeName(propData.type) === normalizedType
  }

  // Set the insensitive case flag only if only lowercased was used
  const allLowercased = /^[^A-Z]+$/.test(pattern)
  // The global flag is required by ./bin/wb-props to highlight matches
  const flag = allLowercased ? 'ig' : 'g'
  const filterRegex = new RegExp(pattern, flag)

  let typeFilter
  if (normalizedType && isKnownType) {
    typeFilter = propData => normalizeTypeName(propData.type) === normalizedType
  } else {
    typeFilter = () => true
  }

  const filterFn = propData => {
    if (!typeFilter(propData)) return false
    if (propData == null) return false
    const { label, description, aliases } = propData
    const propStr = [ label, description, aliases ].join(' ')
    return propStr.match(filterRegex) != null
  }

  filterFn.regex = filterRegex

  return filterFn
}
