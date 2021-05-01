// Accept anything looking like an id:
// Q33977
// or wd:Q33977
// or 33977
// or https://www.wikidata.org/entity/Q33977
// or https://inventaire.io/entity/wd:Q33977
// or even azfzafzaQ33977afz

const { isNumericId } = require('wikibase-sdk')
const errors_ = require('./errors')
const entityIdPattern = /(Q|P|L)[1-9][0-9]*/
const nestedEntityIdPattern = /L[1-9][0-9]*-(F|S)[1-9][0-9]*/
const entitySchemaIdPattern = /(E)[1-9][0-9]*/

module.exports = (input, allowNestedIds) => {
  if (allowNestedIds !== false) {
    const nestedEntityIdMatch = input.match(nestedEntityIdPattern)
    if (nestedEntityIdMatch) return nestedEntityIdMatch[0]
  }

  const entityIdMatch = input.match(entityIdPattern)
  if (entityIdMatch) return entityIdMatch[0]

  if (isNumericId(input)) return `Q${input}`

  const entitySchemaIdMatch = input.match(entitySchemaIdPattern)
  if (entitySchemaIdMatch) return entitySchemaIdMatch[0]

  throw errors_.new('invalid id', input)
}
