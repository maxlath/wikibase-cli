// Accept anything looking like an id:
// Q33977
// or wd:Q33977
// or 33977
// or https://www.wikidata.org/entity/Q33977
// or https://inventaire.io/entity/wd:Q33977
// or even azfzafzaQ33977afz

const { isEntityId, isNumericId } = require('wikibase-sdk')
const errors_ = require('./errors')

module.exports = input => {
  const match = input.match(/(Q|P|L)\d+/)

  if (match) {
    const id = match[0]
    if (isEntityId(id)) return id
  }

  if (isNumericId(input)) return `Q${input}`

  throw errors_.new('invalid id', input)
}
