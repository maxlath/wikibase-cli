const lightGet = require('../lib/light_get')
const program = require('./program')
const { getEntityRevision, simplify } = require('../lib/wbk')(program)
const { simplify, keep } = program
const options = require('../lib/parse_simplify_options')(keep)
const _ = require('lodash')

module.exports = (id, revision) => {
  const url = getEntityRevision(id, revision)
  lightGet(url)
  .then(body => {
    var entity = _.values(body.entities)[0]
    if (simplify) entity = simplify.entity(entity, options)
    console.log(JSON.stringify(entity))
  })
}
