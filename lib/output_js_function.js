const dropQuotes = text => {
  return text
  .split('\n')
  .map(line => {
    return line
    // Remove keys quotes when possible
    .replace(/^(\s+)"([a-zA-Z]\w+)":\s/, '$1$2: ')
    // Alternatively, replace them by single quotes
    .replace(/^(\s+)"([^"']+)":\s/, '$1\'$2\': ')
    // Remove values quotes when possible
    .replace(/:\s"([^"']+)"(,?)$/g, ': \'$1\'$2')
    // Even when the value is on its own line
    .replace(/^(\s+)"([^"']+)"(,?)$/g, '$1\'$2\'$3')
  })
  .join('\n')
}

module.exports = entity => {
  const json = JSON.stringify(entity, null, 2)
  return `module.exports = () => (${dropQuotes(json)})`
}
