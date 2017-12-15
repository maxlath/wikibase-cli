const chalk = require('chalk')
const { dim, bgWhite, black, red } = chalk
const wdk = require('wikidata-sdk')
const { mainProps, propTypes } = require('../lib/properties')

module.exports = (labels, props, simplifiedClaims) => {
  const buildClaimsText = BuildClaimsText(labels, props)

  return Object.keys(simplifiedClaims)
  .map(property => buildClaimsText(property, simplifiedClaims[property]))
  .sort(byInterestScore)
}

const BuildClaimsText = (labels, props) => (prop, values) => {
  const propData = props[prop]
  if (!propData) {
    console.error(red(`the property ${prop} could not be found\n`) +
      'run `wd props --reset` to refresh the local properties list')
    process.exit(1)
  }
  const propColor = propTypes[propData.type].color
  var propLabel
  if (propColor) {
    propLabel = chalk[propColor](propData.label)
  } else {
    propLabel = black(bgWhite(propData.label))
  }
  const propText = formatEntity(propLabel, prop) + dim(': ')
  const valuesText = values.map(formatValue(labels)).join(' | ')
  const score = getScore(props[prop], prop)
  return { prop, values, propText, valuesText, score }
}

const formatValue = labels => value => {
  return wdk.isEntityId(value) ? formatEntity(labels[value], value) : value
}

const formatEntity = (label, id) => label + ' ' + dim(`(${id})`)

const getScore = (propData, prop) => {
  const earlyPropFactor = 10 / parseInt(prop.slice(1))
  const propTypeFactor = propTypes[propData.type].factor
  const mainPropFactor = mainProps.includes(prop) ? 100 : 0
  return earlyPropFactor + 10 * propTypeFactor + mainPropFactor
}

const byInterestScore = (a, b) => b.score - a.score
