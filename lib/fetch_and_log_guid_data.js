const lightGet = require('../lib/light_get')
const program = require('./program')
const wdk = require('../lib/customized_wdk')(program)
const options = require('../lib/parse_simplify_options')(program.keep)
const { simplify } = program
const output = require('./output')(program)
const { values } = require('lodash')

module.exports = guid => {
  const id = guid.split('$')[0].toUpperCase()
  const url = wdk.customize('getEntities', { ids: id, props: 'claims' })

  return lightGet(url)
  .then(body => {
    const entity = body.entities[id]
    var claim = findClaim(entity.claims, guid)
    if (!claim) throw new Error(`claim not found: ${guid}`)
    if (simplify) claim = wdk.simplify.claim(claim, options)
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
