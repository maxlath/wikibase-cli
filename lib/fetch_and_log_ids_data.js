const program = require('../lib/program')
const wdk = require('../lib/customized_wdk')(program)
const _ = require('lodash')
const errors_ = require('../lib/errors')
const logNdjson = require('./log_ndjson')
const lightGet = require('../lib/light_get')

const props = program.props && program.props.replace(/,/g, '|')
const options = require('../lib/parse_simplify_options')(program.keep)
const { simplify } = program

module.exports = ids => {
  ids.forEach(id => {
    if (!wdk.isEntityId(id)) throw new Error(`invalid entity id: ${id}`)
  })

  const urls = wdk.customize('getManyEntities', { ids, props })

  // Fetch batches sequentially, and with some delay,
  // to be kind with the Wikidata API
  const getNextBatch = () => {
    const url = urls.shift()

    // If url is undefined, all the batches got fetched, we are done
    if (url == null) return Promise.resolve()

    return lightGet(url)
    .then(body => {
      var entities = _.values(body.entities)
      if (simplify) {
        entities = entities.map(entity => wdk.simplify.entity(entity, options))
      }
      logNdjson(entities)
    })
    .then(delay(getNextBatch, 500))
    .catch(errors_.exit)
  }

  return getNextBatch()
}

const delay = (fn, ms) => () => setTimeout(fn, ms)
