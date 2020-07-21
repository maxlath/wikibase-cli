const chalk = require('chalk')
const { grey, bgWhite, black } = chalk
const { isEntityId } = require('wikibase-sdk')
const { propTypes } = require('./properties')
const commonErrors = require('./common_errors')
const getPropertiesData = require('./get_properties_data')

module.exports = async ({ labels, simplifiedClaims, resort, lang }) => {
  const propertiesIds = Object.keys(simplifiedClaims)
  const propertiesData = await getPropertiesData(propertiesIds, lang)

  const claimsText = Object.keys(simplifiedClaims)
    .map(property => buildClaimsText(labels, property, simplifiedClaims[property], propertiesData))

  return resort ? claimsText.sort(byInterestScore) : claimsText
}

const buildClaimsText = (labels, prop, values, propertiesData) => {
  const propData = propertiesData[prop]
  if (!propData) return commonErrors.missingProperty(prop)

  const { label, type } = propData
  const propColor = propTypes[type].color
  const propLabel = propColor ? chalk[propColor](label) : black(bgWhite(label))

  const propText = formatEntity(propLabel, prop) + grey(': ')
  const valuesText = values.map(formatValue(labels)).join(' | ')
  const score = getScore(propertiesData[prop], prop)
  return { prop, values, propText, valuesText, score }
}

const formatValue = labels => value => {
  return isEntityId(value) ? formatEntity(labels[value], value) : value
}

const formatEntity = (label, id) => label + ' ' + grey(`(${id})`)

const getScore = (propData, prop) => {
  const earlyPropFactor = 10 / parseInt(prop.slice(1))
  const propTypeFactor = propTypes[propData.type].factor
  return earlyPropFactor + 10 * propTypeFactor
}

const byInterestScore = (a, b) => b.score - a.score
