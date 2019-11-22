const { isPropertyId, isSitelinkKey } = require('wikibase-sdk')
const langPattern = /^\w{2,3}(-\w{2,4})?$/
const termSections = [
  'labels',
  'descriptions',
  'aliases'
]

module.exports = propsStr => {
  if (!propsStr) return {}
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
  else return [ { prop, subkey } ]
}

const lazyProps = {
  claims: propertyId => [ { prop: 'claims', subkey: propertyId } ],
  terms: lang => termSections.map(section => ({ prop: section, subkey: lang })),
  sitelinks: site => [ { prop: 'sitelinks', subkey: site } ]
}

const aggregate = (index, propsData) => {
  propsData.forEach(propData => {
    const { prop, subkey } = propData
    index[prop] = index[prop] || {}
    if (subkey) index[prop][subkey] = true
  })
  return index
}
