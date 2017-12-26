const wdk = require('wikidata-sdk')

module.exports = (pattern, filter) => data => {
  // Special case: when the pattern is a property id, just log the property
  if (wdk.isPropertyId(pattern) && data[pattern] != null) {
    const obj = {}
    obj[pattern] = data[pattern]
    return JSON.stringify(obj, null, 2)
  }

  var text = '{'
  for (let key in data) {
    let value = data[key]
    if (!filter || filter(value)) {
      let bla = `\n  "${key}": ${spacedInlinedJson(value)},`
      text += bla
    }
  }
  // Remove the last comma
  text = text.replace(/,$/, '')
  text += '\n}'
  return text
}

const spacedInlinedJson = function (value) {
  return JSON.stringify(value)
    .replace('{', '{ ')
    .replace('}', ' }')
    .replace(',"', ', "')
    // There can be sevaral ':', thus the need to use the 'g' flag
    .replace(/":/g, '": ')
}
