module.exports = propsStr => {
  if (!propsStr) return {}
  return propsStr
  .split(',')
  .map(propStr => {
    const [ prop, subkey ] = propStr.split('.')
    return { prop, subkey }
  })
  .reduce(aggregate, { props: [], propsSubkeys: {} })
}

const aggregate = (index, propData) => {
  const { prop, subkey } = propData
  index.props.push(prop)
  index.propsSubkeys[prop] = subkey
  return index
}
