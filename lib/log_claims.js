const { dim, bgBlack } = require('chalk')
const _ = require('lodash')
const wdk = require('wikidata-sdk')
const getLangProps = require('../lib/get_lang_props')

module.exports = (program, simplifiedClaims, props) => {
  const getLabels = require('../lib/get_labels')(program)
  const { lang } = program

  return Promise.all([
    getLabels(collectEntityIds(simplifiedClaims)),
    getLangProps(lang)
  ])
  .then(results => {
    const [ labels, props ] = results
    const buildClaimsText = BuildClaimsText(labels, props)

    const claimsTexts = []
    var longestPropText = 0
    for (let k in simplifiedClaims) {
      let v = simplifiedClaims[k]
      let claimsTextData = buildClaimsText(k, v)
      claimsTexts.push(claimsTextData)
      longestPropText = _.max([ longestPropText, claimsTextData.propText.length ])
    }
    const targetPropTextLenght = longestPropText
    console.log(claimsTexts.map(logPropClaims(targetPropTextLenght)).join('\n\n'))
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
  const propText = formatEntity(bgBlack(props[prop]), prop) + ': '
  const valuesText = values.map(formatValue(labels)).join(' | ')
  return { propText, valuesText }
}

const formatValue = labels => value => {
  return wdk.isEntityId(value) ? formatEntity(labels[value], value) : value
}

const formatEntity = (label, id) => label + ' ' + dim(`(${id})`)

const logPropClaims = propTextLenght => claimsTextData => {
  const { propText, valuesText } = claimsTextData
  return harmonizedLength(propText, propTextLenght) + valuesText
}

const harmonizedLength = (str, minLength) => {
  if (minLength && str.length < minLength) str = _.padEnd(str, minLength)
  return str
}
