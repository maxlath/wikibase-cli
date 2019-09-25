module.exports = termType => ([ id, language, ...value ]) => {
  value = value.join(' ')
  if (termType === 'alias') value = value.split('|')
  return [ { id, language, value } ]
}
