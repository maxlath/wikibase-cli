const chalk = require('chalk')
const { dim, bgWhite, black } = chalk
const { isEntityId } = require('wikibase-sdk')
const { mainProps, propTypes } = require('./properties')
const commonErrors = require('./common_errors')

module.exports = (labels, props, simplifiedClaims) => {
  const buildClaimsText = BuildClaimsText(labels, props)

  return Object.keys(simplifiedClaims)
  .map(property => buildClaimsText(property, simplifiedClaims[property]))
  .sort(byInterestScore)
}

const BuildClaimsText = (labels, props) => (prop, values) => {
  const propData = props[prop]
  if (!propData) return commonErrors.missingProperty(prop)

  const { label, type } = propData
  const propColor = propTypes[type].color
  const propLabel = propColor ? chalk[propColor](label) : black(bgWhite(label))

  const propText = formatEntity(propLabel, prop) + dim(': ')
  const valuesText = values.map(formatValue(labels)).join(' | ')
  const score = getScore(props[prop], prop)
  return { prop, values, propText, valuesText, score }
}

const formatValue = labels => value => {
  return isEntityId(value) ? formatEntity(labels[value], value) : value
}

const formatEntity = (label, id) => label + ' ' + dim(`(${id})`)

const getScore = (propData, prop) => {
  const earlyPropFactor = 10 / parseInt(prop.slice(1))
  const propTypeFactor = propTypes[propData.type].factor
  const mainPropFactor = mainProps.includes(prop) ? 100 : 0
  return earlyPropFactor + 10 * propTypeFactor + mainPropFactor
}

const byInterestScore = (a, b) => b.score - a.score
