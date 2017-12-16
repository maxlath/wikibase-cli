const _ = require('lodash')
const wdk = require('wikidata-sdk')
const getLangProps = require('../lib/get_lang_props')
const filterClaimsProperties = require('../lib/filter_claims_properties')
const getClaimsTexts = require('../lib/get_claims_texts')

module.exports = (program, simplifiedClaims, pattern) => {
  const getLabels = require('../lib/get_labels')(program)
  return Promise.all([
    getLabels(collectEntityIds(simplifiedClaims)),
    getLangProps(program, true)
  ])
  .then(([ labels, props ]) => {
    if (pattern) {
      simplifiedClaims = filterClaimsProperties(props, simplifiedClaims, pattern)
    }

    const claimsTexts = getClaimsTexts(labels, props, simplifiedClaims)

    const propTextLength = claimsTexts.map(data => data.propText.length)
    const longestPropText = _.max(propTextLength) || 0

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

const propClaimsText = targetLength => claimsTextData => {
  const { propText, valuesText } = claimsTextData
  return harmonizedLength(propText, targetLength) + valuesText
}

const harmonizedLength = (str, minLength) => {
  if (minLength && str.length < minLength) str = _.padEnd(str, minLength)
  return str
}
