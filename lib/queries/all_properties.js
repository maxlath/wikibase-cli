export default lang => {
  return `SELECT ?property ?propertyLabel ?propertyType ?propertyDescription ?propertyAltLabel WHERE {
    ?property wikibase:propertyType ?propertyType .
    SERVICE wikibase:label { bd:serviceParam wikibase:language "${lang},en". }
  }
  ORDER BY ASC(xsd:integer(STRAFTER(STR(?property), 'P')))`
}
