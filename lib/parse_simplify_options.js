const propsMap = {
  all: 'keepAll',
  richvalues: 'keepRichValues',
  types: 'keepTypes',
  qualifiers: 'keepQualifiers',
  references: 'keepReferences',
  snaktypes: 'keepSnaktypes',
  ids: 'keepIds',
  hashes: 'keepHashes',
  nontruthy: 'keepNonTruthy',
  nondeprecated: 'keepNonDeprecated',
  ranks: 'keepRanks',
  badges: 'keepBadges',
}

export default ({ simplify: simplifyOption, keep: props, timeConverter }) => {
  const options = {}

  if (props != null) {
    props.toLowerCase().split(',')
    .forEach(prop => {
      const propName = propsMap[prop]
      if (propName) options[propName] = true
      else throw new Error(`unknown option: ${prop}`)
    })
  }

  if (timeConverter) options.timeConverter = timeConverter

  const optionsKeys = Object.keys(options)

  if (optionsKeys.length > 0 && !simplifyOption) {
    throw new Error(`simplify options were set without calling --simplify: ${optionsKeys}`)
  }

  return options
}
