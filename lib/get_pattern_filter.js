const { propTypes } = require('./properties')

module.exports = (pattern, typesIncluded) => {
  if (!(pattern && pattern.length > 0)) return

  if (typesIncluded && pattern in propTypes) {
    return propData => propData.type === pattern
  }

  // Set the insensitive case flag only if only lowercased was used
  const allLowercased = /^[^A-Z]+$/.test(pattern)
  const flag = allLowercased ? 'i' : ''
  const filterRegex = new RegExp(pattern, flag)

  return propData => {
    if (propData == null) return false
    if (typesIncluded) propData = propData.label
    return propData.match(filterRegex) != null
  }
}
