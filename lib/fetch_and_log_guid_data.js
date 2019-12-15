const { get } = require('../lib/request')
const program = require('./program')
require('../lib/exit_on_missing').instance(program.instance)
const { getEntities, simplify } = require('../lib/wbk')(program)
const options = require('../lib/parse_simplify_options')(program.keep)
const { simplify: simplifyOption } = program
const output = require('./output')(program)
const { values } = require('lodash')

module.exports = guid => {
  const id = guid.split('$')[0].toUpperCase()
  const url = getEntities({ ids: id, props: 'claims' })

  return get(url)
  .then(body => {
    const entity = body.entities[id]
    var claim = findClaim(entity.claims, guid)
    if (!claim) throw new Error(`claim not found: ${guid}`)
    if (simplifyOption) claim = simplify.claim(claim, options)
    output(claim)
  })
}

const findClaim = (claims, guid) => {
  guid = guid.toLowerCase()
  for (let propertyClaims of values(claims)) {
    for (let claim of propertyClaims) {
      if (claim.id.toLowerCase() === guid) return claim
    }
  }
}
