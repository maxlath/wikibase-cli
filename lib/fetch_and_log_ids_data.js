const program = require('./program')
require('./exit_on_missing').instance(program.instance)
const { simplify } = require('./wbk')(program)
const logNdjson = require('./log_ndjson')
const getTtlEntities = require('./get_ttl_entities')
const parseProps = require('./parse_props')
const dropNonSelectedSubprops = require('./drop_non_selected_subprops')
const getEntitiesByBatches = require('./get_entities_by_batches')

const requestedPropsAndSubProps = parseProps(program.props)
const requestedProps = Object.keys(requestedPropsAndSubProps)

const options = require('../lib/parse_simplify_options')(program.keep)
const { simplify: simplifyOption, format } = program

module.exports = ids => {
  if (format === 'ttl') return getTtlEntities(ids)

  const onResponse = entities => {
    entities.forEach(entity => dropNonSelectedSubprops(entity, requestedPropsAndSubProps))
    if (simplifyOption) {
      entities = entities.map(entity => simplify.entity(entity, options))
    }
    logNdjson(entities)
  }

  return getEntitiesByBatches({ ids, props: requestedProps, onResponse })
}
