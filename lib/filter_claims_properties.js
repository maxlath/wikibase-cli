import { missingProperty } from './common_errors.js'
import getPatternFilter from './get_pattern_filter.js'

export default (propertiesData, claims, pattern) => {
  const patternFilter = getPatternFilter(pattern, true)

  const filteredClaims = {}

  Object.keys(claims).forEach(property => {
    const propData = propertiesData[property]
    if (!propData) return missingProperty(property)
    if (patternFilter(propData)) filteredClaims[property] = claims[property]
  })

  return filteredClaims
}
