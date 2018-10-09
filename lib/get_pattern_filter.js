const { propTypes } = require('./properties')

module.exports = (pattern, includeTypes) => {
  if (!(pattern && pattern.length > 0)) return

  if (includeTypes && pattern in propTypes) {
    return propData => propData.type === pattern
  }

  // Set the insensitive case flag only if only lowercased was used
  const allLowercased = /^[^A-Z]+$/.test(pattern)
  // The global flag is required by ./bin/wd-props to highlight matches
  const flag = allLowercased ? 'ig' : 'g'
  const filterRegex = new RegExp(pattern, flag)

  const filterFn = propData => {
    if (propData == null) return false
    const { label, description, aliases } = propData
    const propStr = [ label, description, aliases ].join(' ')
    return propStr.match(filterRegex) != null
  }

  filterFn.regex = filterRegex

  return filterFn
}
