const chalk = require('chalk')
const { dim, bgWhite, black } = chalk
const _ = require('lodash')
const wdk = require('wikidata-sdk')
const getLangProps = require('../lib/get_lang_props')
const { mainProps } = require('../lib/properties')

module.exports = (program, simplifiedClaims, props) => {
  const getLabels = require('../lib/get_labels')(program)
  return Promise.all([
    getLabels(collectEntityIds(simplifiedClaims)),
    getLangProps(program, true)
  ])
  .then(results => {
    const [ labels, props ] = results
    const buildClaimsText = BuildClaimsText(labels, props)

    var claimsTexts = []
    var longestPropText = 0
    for (let k in simplifiedClaims) {
      let v = simplifiedClaims[k]
      let claimsTextData = buildClaimsText(k, v)
      claimsTexts.push(claimsTextData)
      longestPropText = _.max([ longestPropText, claimsTextData.propText.length ])
    }
    claimsTexts = claimsTexts.sort(byInterestScore)
    const claimsText = claimsTexts.map(propClaimsText(longestPropText))
    const lineBreaks = claimsTexts.length > 3 ? '\n\n' : '\n'
    console.log(claimsText.join(lineBreaks))
  })
}

const collectEntityIds = claims => {
  return _(claims)
  .values()
  .flatten()
  .filter(wdk.isEntityId)
  .value()
}

const BuildClaimsText = (labels, props) => (prop, values) => {
  const propData = props[prop]
  const propColor = propTypes[propData.type].color
  var propLabel
  if (propColor) {
    propLabel = chalk[propColor](propData.label)
  } else {
    propLabel = black(bgWhite(propData.label))
  }
  const propText = formatEntity(propLabel, prop) + ': '
  const valuesText = values.map(formatValue(labels)).join(' | ')
  const score = getScore(props[prop], prop)
  return { prop, values, propText, valuesText, score }
}

const formatValue = labels => value => {
  return wdk.isEntityId(value) ? formatEntity(labels[value], value) : value
}

const formatEntity = (label, id) => label + ' ' + dim(`(${id})`)

const propClaimsText = targetLength => claimsTextData => {
  const { propText, valuesText } = claimsTextData
  return harmonizedLength(propText, targetLength) + valuesText
}

const harmonizedLength = (str, minLength) => {
  if (minLength && str.length < minLength) str = _.padEnd(str, minLength)
  return str
}

const getScore = (propData, prop) => {
  const earlyPropFactor = 10 / parseInt(prop.slice(1))
  const propTypeFactor = propTypes[propData.type].factor
  const mainPropFactor = mainProps.includes(prop) ? 100 : 0
  return earlyPropFactor + 10 * propTypeFactor + mainPropFactor
}

const propTypes = {
  ExternalId: { factor: 0.1, color: 'dim' },
  String: { factor: 1 },
  WikibaseItem: { factor: 1 },
  Time: { factor: 1 },
  Monolingualtext: { factor: 2 },
  Quantity: { factor: 1 },
  WikibaseProperty: { factor: 1 },
  Url: { factor: 0.5 },
  CommonsMedia: { factor: 0.5 },
  GlobeCoordinate: { factor: 0.5 }
}

const byInterestScore = (a, b) => b.score - a.score
