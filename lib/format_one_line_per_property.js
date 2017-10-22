module.exports = filter => data => {
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
