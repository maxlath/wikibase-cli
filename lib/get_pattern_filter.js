const program = require('./program')
const { propTypes } = require('./properties')

module.exports = (pattern, includeTypes) => {
  const { type } = program
  if (!(pattern && pattern.length > 0)) {
    if (typeof type === 'string') {
      // Consider that what was passed as a type argument was actually a pattern
      if (!(type.toLowerCase() in propTypes)) pattern = type
    } else {
      return
    }
  }

  if (includeTypes && pattern.toLowerCase() in propTypes) {
    return propData => propData.type === pattern
  }

  // Set the insensitive case flag only if only lowercased was used
  const allLowercased = /^[^A-Z]+$/.test(pattern)
  // The global flag is required by ./bin/wb-props to highlight matches
  const flag = allLowercased ? 'ig' : 'g'
  const filterRegex = new RegExp(pattern, flag)

  let typeFilter
  if (typeof type === 'string' && type.toLowerCase() in propTypes) {
    typeFilter = propData => propData.type === type
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
