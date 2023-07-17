import { isPropertyId, isSitelinkKey } from 'wikibase-sdk'

const langPattern = /^\w{2,3}(-\w{2,4})?$/
const termSections = [
  'labels',
  'descriptions',
  'aliases',
  'lemmas',
]

export default propsStr => {
  if (!propsStr) return {}

  // The Wikibase API doesn't accept lemmas, forms, senses props
  // but returns them if info are requested
  if (propsStr.match(/(lemmas|forms|senses)/)) {
    propsStr += ',info'
  }

  return propsStr
  .split(',')
  .map(getPropsAndSubKeys)
  .reduce(aggregate, {})
}

const getPropsAndSubKeys = propStr => {
  const [ prop, subkey ] = propStr.split('.')
  if (isPropertyId(prop)) return lazyProps.claims(prop)
  else if (prop.match(langPattern)) return lazyProps.terms(prop)
  else if (isSitelinkKey(prop)) return lazyProps.sitelinks(prop)
  // Handle Wikimedia Commons weirdness: it uses entity.statements but wbgetentities expects a "claims" prop
  else if (prop === 'statements') return [ { prop: 'claims', subkey } ]
  else return [ { prop, subkey } ]
}

const lazyProps = {
  claims: propertyId => [ { prop: 'claims', subkey: propertyId } ],
  terms: lang => termSections.map(section => ({ prop: section, subkey: lang })),
  sitelinks: site => [ { prop: 'sitelinks', subkey: site } ],
}

const aggregate = (index, propsData) => {
  propsData.forEach(propData => {
    const { prop, subkey } = propData
    index[prop] = index[prop] || {}
    if (subkey) index[prop][subkey] = true
  })
  return index
}
