import { chain, max, padEnd } from 'lodash-es'
import { isEntityId } from 'wikibase-sdk'
import { bgMagenta, grey } from '#lib/chalk'
import filterClaimsProperties from '#lib/filter_claims_properties'
import getClaimsTexts from '#lib/get_claims_texts'
import { getEntitiesLabels } from './get_entities_labels.js'
import getPropertiesData from './get_properties_data.js'

export default async ({ program, simplifiedClaims, extraData = {}, pattern, resort }) => {
  const { lang } = program
  const ids = collectEntityIds(simplifiedClaims, extraData)
  const labels = await getEntitiesLabels(ids, lang)

  const propertiesIds = Object.keys(simplifiedClaims)
  const propertiesData = await getPropertiesData(propertiesIds, lang)

  logExtraData(extraData, labels)

  if (pattern || program.type) {
    simplifiedClaims = filterClaimsProperties(propertiesData, simplifiedClaims, pattern)
  }

  const claimsTexts = await getClaimsTexts({
    labels,
    simplifiedClaims,
    resort,
    lang,
  })

  const propTextLength = claimsTexts.map(data => data.propText.length)
  const longestPropText = max(propTextLength) || 0

  const claimsText = claimsTexts.map(propClaimsText(longestPropText))
  const lineBreaks = claimsTexts.length > 3 ? '\n\n' : '\n'
  console.log(claimsText.join(lineBreaks))
}

const collectEntityIds = (claims, extraData) => {
  const claimIds = chain(claims)
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
  if (minLength && str.length < minLength) str = padEnd(str, minLength)
  return str
}

const logExtraData = (extraData, labels) => {
  for (const key in extraData) {
    const id = extraData[key]
    console.log(bgMagenta(key), labels[id], grey(id))
  }
}
