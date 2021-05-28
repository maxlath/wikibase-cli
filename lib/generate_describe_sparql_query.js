const { isEntityId } = require('wikibase-sdk')
const errors_ = require('./errors')

module.exports = describe => {
  if (describe.startsWith('http')) return `DESCRIBE <${describe}>`
  if (isEntityId(describe)) return `DESCRIBE wd:${describe}`
  throw errors_.new('could not identify describe node type', 400, { describe })
}
