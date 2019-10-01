const propsMap = {
  richvalues: 'keepRichValues',
  types: 'keepTypes',
  qualifiers: 'keepQualifiers',
  references: 'keepReferences',
  snaktypes: 'keepSnaktypes',
  ids: 'keepIds',
  hashes: 'keepHashes',
  nontruthy: 'keepNonTruthy',
  ranks: 'keepRanks'
}

module.exports = props => {
  const options = {}
  if (!(props)) return options

  if (props === 'all') {
    options.keepAll = true
  } else {
    props.toLowerCase().split(',')
    .forEach(prop => {
      const propName = propsMap[prop]
      if (propName) options[propName] = true
      else throw new Error(`unknown option: ${prop}`)
    })
  }

  return options
}
