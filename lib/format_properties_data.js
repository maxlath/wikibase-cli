const { isPropertyId } = require('wikibase-sdk')

module.exports = (pattern, filter, includeAllDetails, includeTypes) => data => {
  // Special case: when the pattern is a property id, just log the property
  if (isPropertyId(pattern) && data[pattern] != null) {
    const prop = pattern
    const obj = {}
    obj[prop] = getValue(data[prop], includeAllDetails, includeTypes)
    return JSON.stringify(obj, null, 2)
  }

  const propsData = {}

  for (const prop in data) {
    const propData = data[prop]
    if (!filter || filter(propData)) {
      const value = getValue(data[prop], includeAllDetails, includeTypes)
      propsData[prop] = value
    }
  }

  if (includeAllDetails) return JSON.stringify(propsData, null, 2)

  return onePropertyPerLine(propsData)
}

const getValue = (propData, includeAllDetails, includeTypes) => {
  if (includeAllDetails) return propData
  if (includeTypes) {
    const { label, type } = propData
    return { label, type }
  }
  return propData.label
}

const onePropertyPerLine = propsData => {
  let text = '{'
  for (const prop in propsData) {
    text += `\n  "${prop}": ${spacedInlinedJson(propsData[prop])},`
  }
  if (text === '{') return '{}'
  // Remove the last comma
  text = text.replace(/,$/, '')
  text += '\n}'
  return text
}

const spacedInlinedJson = value => {
  // Returning null in case of a missing value
  // as it's a valid JSON value
  if (!value) return null
  return JSON.stringify(value)
    .replace(/{/g, '{ ')
    .replace(/}/g, ' }')
    .replace(/,"/g, ', "')
    .replace(/":/g, '": ')
}
