const propsMap = {
  richvalues: 'keepRichValues',
  types: 'keepTypes',
  qualifiers: 'keepQualifiers',
  references: 'keepReferences',
  ids: 'keepIds',
  hashes: 'keepHashes',
  nontruthy: 'keepNonTruthy'
}

module.exports = props => {
  const options = {}
  if (!(props)) return options

  if (props === 'all') {
    Object.keys(propsMap).forEach(prop => {
      options[propsMap[prop]] = true
    })
    return options
  }

  props
  .toLowerCase()
  .split(',')
  .forEach(prop => {
    const propName = propsMap[prop]
    if (propName) options[propName] = true
    else throw new Error(`unknown option: ${prop}`)
  })

  return options
}
