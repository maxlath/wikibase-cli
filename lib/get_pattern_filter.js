const { propTypes } = require('./properties')

module.exports = (pattern, typesIncluded) => {
  if (!(pattern && pattern.length > 0)) return

  if (typesIncluded && pattern in propTypes) {
    return value => value.type === pattern
  }

  // Do not Set the insensitie case flag if cases are mixed
  const uniqueCase = /^([a-z0-9\W]+|[A-Z0-9\W]+|)$/.test(pattern)
  const flag = uniqueCase ? 'i' : ''
  const filterRegex = new RegExp(pattern, flag)

  return value => {
    if (value == null) return false
    if (typesIncluded) value = value.label
    return value.match(filterRegex) != null
  }
}
