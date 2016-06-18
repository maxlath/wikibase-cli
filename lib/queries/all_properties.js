module.exports = function (lang) {
  return `SELECT ?property ?propertyLabel WHERE {
    ?property a wikibase:Property .
    SERVICE wikibase:label {
      bd:serviceParam wikibase:language "${lang}" .
    }
  }`
}
