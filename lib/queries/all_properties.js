module.exports = function (lang, includeTypes = false) {
  const optionalSelect = includeTypes ? dataTypeSelect : ''
  const optionalRequest = includeTypes ? requestDataType : ''

  return `SELECT ?property ?propertyLabel ${optionalSelect} WHERE {
    ?property a wikibase:Property .
    ${optionalRequest}
    SERVICE wikibase:label {
      bd:serviceParam wikibase:language "${lang}" .
    }
  }`
}

const dataTypeSelect = '?propertyType'
const requestDataType = `    ?property wikibase:propertyType ?propertyType .`
