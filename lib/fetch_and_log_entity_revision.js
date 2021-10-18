const { get } = require('../lib/request')
const program = require('./program')
require('../lib/exit_on_missing').instance(program.instance)
const { getEntityRevision, simplify } = require('../lib/wbk')(program)
const { simplify: simplifyOption } = program
const options = require('../lib/parse_simplify_options')(program)
const _ = require('lodash')

module.exports = (id, revision) => {
  const url = getEntityRevision(id, revision)
  get(url)
  .then(body => {
    let entity = _.values(body.entities)[0]
    if (simplifyOption) entity = simplify.entity(entity, options)
    console.log(JSON.stringify(entity))
  })
}
