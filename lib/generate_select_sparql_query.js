const formatStatementElementValue = require('./format_statement_element_value')

module.exports = program => {
  let { count: countResults, labels: selectLabels, lang, qualifierProperty, qualifierObject } = program

  const useSubSnaks = (qualifierProperty != null || qualifierObject != null)

  selectLabels = selectLabels && !countResults

  if (program.subject && program.property && program.object) {
    console.log('At maximum two main statement elements should be set')
    process.exit(1)
  }

  let select = ''
  let triple
  if (useSubSnaks) {
    triple = `?subject ?pProperty ?statement .
  ?statement ?psProperty ?object .
  ?statement ?pqProperty ?pqObject .`
  } else {
    triple = '?subject ?property ?object .'
  }

  const setElement = (elName, value) => {
    value = value || program[elName]
    if (value) {
      value = formatStatementElementValue[elName](value)
      triple = triple.replace(`?${elName}`, value)
    } else {
      if (countResults) {
        // Get a count by selecting the first missing variable
        if (select === '') select = `(COUNT(?${elName}) AS ?count)`
      } else {
        select += `?${elName} `
        if (selectLabels && elName !== 'property') select += `?${elName}Label `
      }
      // If the property isn't set, specify that we want only direct/truthy claims
      // and not every statements and qualifiers
      if (elName === 'property') {
        triple += '\n  ?prop wikibase:directClaim ?property .'
        if (selectLabels) select += '?propLabel '
      }
    }
  }

  setElement('subject')
  if (useSubSnaks) {
    setElement('pProperty', program.property)
    setElement('psProperty', program.property)
    if (qualifierProperty) setElement('pqProperty', qualifierProperty)
    if (qualifierObject) setElement('pqObject', qualifierObject)
  } else {
    setElement('property')
  }
  setElement('object')

  if (selectLabels) {
    if (lang !== 'en') {
      // include English as a fallback
      lang = `${lang},en`
    }
    triple += `
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "${lang}" .
  }`
  }

  const { limit } = program

  let sparql = `SELECT ${select.trim()} WHERE {
  ${triple}
}`
  if (limit) sparql += ` LIMIT ${limit}`

  return sparql
}
