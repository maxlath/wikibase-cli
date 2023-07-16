import chalk from 'chalk'
import { isEntityId } from 'wikibase-sdk'
import { missingProperty } from './common_errors.js'
import getPropertiesData from './get_properties_data.js'
import { propTypes } from './properties.js'

const { grey, bgWhite, black } = chalk

export default async ({ labels, simplifiedClaims, resort, lang }) => {
  const propertiesIds = Object.keys(simplifiedClaims)
  const propertiesData = await getPropertiesData(propertiesIds, lang)

  const claimsText = Object.keys(simplifiedClaims)
    .map(property => buildClaimsText(labels, property, simplifiedClaims[property], propertiesData))

  return resort ? claimsText.sort(byInterestScore) : claimsText
}

const buildClaimsText = (labels, prop, values, propertiesData) => {
  const propData = propertiesData[prop]
  if (!propData) return missingProperty(prop)

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
