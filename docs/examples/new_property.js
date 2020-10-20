// Copy this file as 'new_property.js' in your current directory
// then run it in cli with:
// wd create-entity new_property.js 'monolingualtext' 'some property label'

// Valid datatypes:
//  - commons-media
//  - external-id
//  - geo-shape
//  - globe-coordinate
//  - math
//  - monolingualtext
//  - musical-notation
//  - quantity
//  - string
//  - tabular-data
//  - time
//  - url
//  - wikibase-form
//  - wikibase-item
//  - wikibase-property
//  - wikibase-lexeme

module.exports = function (datatype, label) {
  return {
    datatype: datatype,
    labels: {
      en: label,
    },
    summary: `create new ${datatype} property: ${label}`
  }
}
