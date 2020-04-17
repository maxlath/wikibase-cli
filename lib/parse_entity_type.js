const shortTypes = {
  f: 'form',
  i: 'item',
  p: 'property',
  l: 'lexeme',
  s: 'sense'
}

module.exports = (type = 'item') => {
  // Fix plural forms
  type = type.replace(/s$/, '')
  return shortTypes[type] || type
}
