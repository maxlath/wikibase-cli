const { get } = require('../lib/request')
const program = require('./program')
require('../lib/exit_on_missing').instance(program.instance)
const { getEntities, simplify } = require('../lib/wbk')(program)
const options = require('../lib/parse_simplify_options')(program.keep)
const { simplify: simplifyOption } = program
const output = require('./output')(program)

module.exports = async propertyClaimsId => {
  const [ entityId, propertyId ] = propertyClaimsId.toUpperCase().split('#')
  const url = getEntities({ ids: entityId, props: 'claims' })

  const { entities } = await get(url)
  const entity = entities[entityId]
  if (entity.missing != null) throw new Error(`entity not found: ${entityId}`)
  let claims = entity.claims[propertyId] || []
  if (simplifyOption) claims = simplify.propertyClaims(claims, options)
  output(claims)
}
