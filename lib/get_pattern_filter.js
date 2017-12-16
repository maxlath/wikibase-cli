const { propTypes } = require('./properties')

module.exports = (pattern, typesIncluded) => {
  if (!(pattern && pattern.length > 0)) return

  if (typesIncluded && pattern in propTypes) {
    return propData => propData.type === pattern
  }

  // Do not Set the insensitie case flag if cases are mixed
  const uniqueCase = /^([a-z0-9\W]+|[A-Z0-9\W]+|)$/.test(pattern)
  const flag = uniqueCase ? 'i' : ''
  const filterRegex = new RegExp(pattern, flag)

  return propData => {
    if (propData == null) return false
    if (typesIncluded) propData = propData.label
    return propData.match(filterRegex) != null
  }
}
