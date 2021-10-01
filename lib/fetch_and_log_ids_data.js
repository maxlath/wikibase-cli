const program = require('./program')
require('./exit_on_missing').instance(program.instance)
const { simplify, isEntitySchemaId } = require('./wbk')(program)
const logNdjson = require('./log_ndjson')
const getTtlEntities = require('./get_ttl_entities')
const getEntitiesSchemas = require('./get_entities_schemas')
const parseProps = require('./parse_props')
const dropNonSelectedSubprops = require('./drop_non_selected_subprops')
const getEntitiesByBatches = require('./get_entities_by_batches')

const requestedPropsAndSubProps = parseProps(program.props)
const requestedProps = Object.keys(requestedPropsAndSubProps)

const options = require('../lib/parse_simplify_options')(program)
const { simplify: simplifyFlag, format } = program

module.exports = ids => {
  if (format === 'ttl') return getTtlEntities(ids)

  const entitiesSchemasIds = ids.filter(isEntitySchemaId)

  if (entitiesSchemasIds.length > 0) return getEntitiesSchemas(entitiesSchemasIds)

  const onResponse = entities => {
    entities.forEach(entity => dropNonSelectedSubprops(entity, requestedPropsAndSubProps))
    if (simplifyFlag) {
      entities = entities.map(entity => simplify.entity(entity, options))
    }
    logNdjson(entities)
  }

  return getEntitiesByBatches({ ids, props: requestedProps, onResponse })
}
