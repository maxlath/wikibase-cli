const _ = require('lodash')
const { isEntityId } = require('wikibase-sdk')
const getLangProps = require('../lib/get_lang_props')
const filterClaimsProperties = require('../lib/filter_claims_properties')
const getClaimsTexts = require('../lib/get_claims_texts')
const { bgMagenta, grey } = require('chalk')

module.exports = ({ program, simplifiedClaims, extraData = {}, pattern, resort }) => {
  const getLabels = require('../lib/get_labels')(program)

  return Promise.all([
    getLabels(collectEntityIds(simplifiedClaims, extraData)),
    getLangProps(program)
  ])
  .then(([ labels, props ]) => {
    logExtraData(extraData, labels)

    if (pattern) {
      simplifiedClaims = filterClaimsProperties(props, simplifiedClaims, pattern)
    }

    const claimsTexts = getClaimsTexts({ labels, props, simplifiedClaims, resort })

    const propTextLength = claimsTexts.map(data => data.propText.length)
    const longestPropText = _.max(propTextLength) || 0

    const claimsText = claimsTexts.map(propClaimsText(longestPropText))
    const lineBreaks = claimsTexts.length > 3 ? '\n\n' : '\n'
    console.log(claimsText.join(lineBreaks))
  })
}

const collectEntityIds = (claims, extraData) => {
  const claimIds = _(claims)
    .values()
    .flatten()
    .filter(isEntityId)
    .value()

  const extraDataIds = Object.values(extraData)

  return claimIds.concat(extraDataIds)
}

const propClaimsText = targetLength => claimsTextData => {
  const { propText, valuesText } = claimsTextData
  return harmonizedLength(propText, targetLength) + valuesText
}

const harmonizedLength = (str, minLength) => {
  if (minLength && str.length < minLength) str = _.padEnd(str, minLength)
  return str
}

const logExtraData = (extraData, labels) => {
  for (const key in extraData) {
    const id = extraData[key]
    console.log(bgMagenta(key), labels[id], grey(id))
  }
}
