const program = require('../lib/program')
const { isEntityId, getManyEntities, simplify } = require('../lib/wbk')(program)
const _ = require('lodash')
const errors_ = require('../lib/errors')
const logNdjson = require('./log_ndjson')
const getTtlEntities = require('./get_ttl_entities')
const lightGet = require('../lib/light_get')
const parseProps = require('../lib/parse_props')
const dropNonSelectedSubprops = require('../lib/drop_non_selected_subprops')

const { props, propsSubkeys } = parseProps(program.props)
const options = require('../lib/parse_simplify_options')(program.keep)
const { simplify: simplifyOption, format } = program

module.exports = ids => {
  ids.forEach(id => {
    if (!isEntityId(id)) throw new Error(`invalid entity id: ${id}`)
  })

  if (format === 'ttl') return getTtlEntities(ids)

  const urls = getManyEntities({ ids, props })

  // Fetch batches sequentially, and with some delay,
  // to be kind with the Wikibase API
  const getNextBatch = () => {
    const url = urls.shift()

    // If url is undefined, all the batches got fetched, we are done
    if (url == null) return Promise.resolve()

    return lightGet(url)
    .then(body => {
      var entities = _.values(body.entities)
      entities.forEach(entity => dropNonSelectedSubprops(entity, props, propsSubkeys))
      if (simplifyOption) {
        entities = entities.map(entity => simplify.entity(entity, options))
      }
      logNdjson(entities)
    })
    .then(delay(getNextBatch, 500))
    .catch(errors_.exit)
  }

  return getNextBatch()
}

const delay = (fn, ms) => () => setTimeout(fn, ms)
