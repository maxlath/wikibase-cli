module.exports = termType => ([ id, language, ...value ]) => {
  value = dropQuotes(value.join(' '))
  if (termType === 'alias') value = value.split('|')
  return [ { id, language, value } ]
}

const dropQuotes = value => {
  console.log('value', value)
  if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1)
  if (value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1)
  return value
}
