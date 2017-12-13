// Accept anything looking like an id:
// Q33977
// or wd:Q33977
// or 33977
// or https://www.wikidata.org/entity/Q33977
// or https://inventaire.io/entity/wd:Q33977
// or even azfzafzaQ33977afz

const wdk = require('wikidata-sdk')
const errors_ = require('./errors')

module.exports = function (input) {
  const match = input.match(/(Q|P)\d+/)

  if (match) {
    const id = match[0]
    if (wdk.isEntityId(id)) return id
  }

  if (wdk.isNumericId(input)) return `Q${input}`

  throw errors_.new('invalid id', input)
}
