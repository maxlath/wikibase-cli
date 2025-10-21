// Accept anything looking like an id:
// Q33977
// or q33977
// or wd:Q33977
// or 33977
// or https://www.wikidata.org/entity/Q33977
// or https://inventaire.io/entity/wd:Q33977
// or even azfzafzaQ33977afz

import { isNumericId } from 'wikibase-sdk'
import errors_ from './errors.js'

const entityIdPattern = /(Q|P|L|M)[1-9][0-9]*/
const nestedEntityIdPattern = /L[1-9][0-9]*-(F|S)[1-9][0-9]*/
const entitySchemaIdPattern = /(E)[1-9][0-9]*/
export const guidPattern = /([QPLM]\d+(-[FS]\d+)?)[-$]([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i

export function tolerantIdParserFactory (options = {}) {
  const { allowNestedIds = false, allowEntitiesSchemasIds = false, allowStatementsIds = false } = options

  return function tolerantIdParser (input) {
    if (allowStatementsIds) {
      const guidMatch = input.match(guidPattern)
      if (guidMatch) return guidMatch[0]
    }

    // Uppercase after checking statement ids, as they might need to stay lowercased
    // Example: wds:q1059114-107F1AC7-1195-4137-A779-748D633CDA68
    input = input.toUpperCase()

    if (allowNestedIds) {
      const nestedEntityIdMatch = input.match(nestedEntityIdPattern)
      if (nestedEntityIdMatch) return nestedEntityIdMatch[0]
    }

    if (allowEntitiesSchemasIds) {
      const entitySchemaIdMatch = input.match(entitySchemaIdPattern)
      if (entitySchemaIdMatch) return entitySchemaIdMatch[0]
    }

    const entityIdMatch = input.match(entityIdPattern)
    if (entityIdMatch) return entityIdMatch[0]

    if (isNumericId(input)) return `Q${input}`

    throw errors_.new('invalid id', { input, allowNestedIds, allowEntitiesSchemasIds })
  }
}
