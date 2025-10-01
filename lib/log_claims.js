import { chain, compact, max, padEnd, uniq } from 'lodash-es'
import { bgMagenta, grey } from '#lib/chalk'
import filterClaimsProperties from '#lib/filter_claims_properties'
import getClaimsTexts from '#lib/get_claims_texts'
import { getEntitiesLabels } from './get_entities_labels.js'
import getPropertiesData from './get_properties_data.js'

export default async ({ program, simplifiedClaims, extraData = {}, pattern, resort }) => {
  const { lang } = program
  const ids = collectEntityIds(simplifiedClaims, extraData)
  simplifiedClaims = furtherSimplify(simplifiedClaims)
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
    .filter(isEntityClaim)
    .map(getClaimValue)
    .value()

  const extraDataIds = Object.values(extraData)

  return uniq(compact(claimIds.concat(extraDataIds)))
}

const isEntityClaim = claim => claim.datatype.split('-')[0] === 'wikibase'

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

function furtherSimplify (simplifiedClaims) {
  for (const [ property, propertyClaims ] of Object.entries(simplifiedClaims)) {
    simplifiedClaims[property] = propertyClaims.map(getClaimValue)
  }
  return simplifiedClaims
}

const getClaimValue = claim => claim.value
