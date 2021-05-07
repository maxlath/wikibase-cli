const program = require('./program')
require('./exit_on_missing').instance(program.instance)
const { simplify, isEntitySchemaId } = require('./wbk')(program)
const logNdjson = require('./log_ndjson')
const { logCsv, validatePropsAndInitCsvHeaders } = require('./log_csv')
const getTtlEntities = require('./get_ttl_entities')
const getEntitiesSchemas = require('./get_entities_schemas')
const parseProps = require('./parse_props')
const dropNonSelectedSubprops = require('./drop_non_selected_subprops')
const getEntitiesByBatches = require('./get_entities_by_batches')

const requestedPropsAndSubProps = parseProps(program.props)
const requestedProps = Object.keys(requestedPropsAndSubProps)

const options = require('../lib/parse_simplify_options')(program.keep)
const { simplify: simplifyOption, format, join } = program

module.exports = ids => {
  if (format === 'ttl') return getTtlEntities(ids)

  const entitiesSchemasIds = ids.filter(isEntitySchemaId)

  if (entitiesSchemasIds.length > 0) return getEntitiesSchemas(entitiesSchemasIds)

  if (format === 'csv') validatePropsAndInitCsvHeaders(requestedPropsAndSubProps, join)

  const onResponse = entities => {
    entities.forEach(entity => dropNonSelectedSubprops(entity, requestedPropsAndSubProps))
    if (simplifyOption || format === 'csv') {
      entities = entities.map(entity => simplify.entity(entity, options))
    }
    if (format === 'csv') {
      logCsv({ entities, propsAndSubProps: requestedPropsAndSubProps })
    } else {
      logNdjson(entities)
    }
  }

  return getEntitiesByBatches({ ids, props: requestedProps, onResponse })
}
