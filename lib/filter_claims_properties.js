const getPatternFilter = require('./get_pattern_filter')
const commonErrors = require('./common_errors')

module.exports = (props, claims, pattern) => {
  const patternFilter = getPatternFilter(pattern, true)

  const filteredClaims = {}

  Object.keys(claims).forEach(property => {
    const propData = props[property]
    if (!propData) return commonErrors.missingProperty(property)
    if (patternFilter(propData)) filteredClaims[property] = claims[property]
  })

  return filteredClaims
}
