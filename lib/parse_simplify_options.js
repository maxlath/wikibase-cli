const propsMap = {
  richvalues: 'keepRichValues',
  types: 'keepTypes',
  qualifiers: 'keepQualifiers',
  references: 'keepReferences',
  snaktypes: 'keepSnaktypes',
  ids: 'keepIds',
  hashes: 'keepHashes',
  nontruthy: 'keepNonTruthy',
  nondeprecated: 'keepNonDeprecated',
  ranks: 'keepRanks'
}

module.exports = ({ keep: props, timeConverter }) => {
  const options = {}

  if (props === 'all') {
    options.keepAll = true
  } else if (props != null) {
    props.toLowerCase().split(',')
    .forEach(prop => {
      const propName = propsMap[prop]
      if (propName) options[propName] = true
      else throw new Error(`unknown option: ${prop}`)
    })
  }

  if (timeConverter) options.timeConverter = timeConverter

  return options
}
