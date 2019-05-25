const lightGet = require('../lib/light_get')
const program = require('./program')
const wdk = require('../lib/customized_wdk')(program)
const { simplify, keep } = program
const options = require('../lib/parse_simplify_options')(keep)
const _ = require('lodash')

module.exports = (id, revision) => {
  const url = wdk.customize('getEntityRevision', id, revision)
  lightGet(url)
  .then(body => {
    var entity = _.values(body.entities)[0]
    if (simplify) {
      entity = wdk.simplify.entity(entity, options)
    }
    console.log(JSON.stringify(entity))
  })
}
