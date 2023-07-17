import { getStatementsKey } from 'wikibase-edit/lib/parse_instance.js'
import { simplifyPropertyClaims } from 'wikibase-sdk'
import { exitOnMissingInstance } from '#lib/exit_on_missing'
import optionsFactory from '#lib/parse_simplify_options'
import { get } from '#lib/request'
import wbk from '#lib/wbk'
import { outputFactory } from './output.js'
import program from './program.js'

export async function fetchAndLogPropertyClaimsData (propertyClaimsId) {
  exitOnMissingInstance(program.instance)
  const { getEntities } = wbk(program)
  const options = optionsFactory(program)
  const { simplify: simplifyOption } = program
  const output = outputFactory(program)

  const [ entityId, propertyId ] = propertyClaimsId.toUpperCase().split('#')
  const url = getEntities({ ids: entityId, props: 'claims' })

  const { entities } = await get(url)
  const entity = entities[entityId]
  if (entity.missing != null) throw new Error(`entity not found: ${entityId}`)
  const statementsKey = getStatementsKey(program.instance)
  let claims = entity[statementsKey][propertyId] || []
  if (simplifyOption) claims = simplifyPropertyClaims(claims, options)
  output(claims)
}
