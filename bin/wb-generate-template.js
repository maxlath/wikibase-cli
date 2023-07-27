#!/usr/bin/env node
import { isEntityId } from 'wikibase-sdk'
import { exitOnMissingInstance } from '#lib/exit_on_missing'
import { getEntitiesByBatches } from '#lib/get_entities_by_batches'
import { outputTemplatesFactory } from '#lib/output_templates'
import parseProps from '#lib/parse_props'
import program from '#lib/program'
import { readIdsFromStdin } from '#lib/read_ids_from_stdin'
import { tolerantIdParserFactory } from '#lib/tolerant_id_parser'
import { getWbk } from '#lib/wbk'

await program
.option('-p, --props <props>', 'request only certain properties (info, sitelinks, aliases, labels, descriptions, claims, datatype)')
.option('-r, --revision <id>', 'request a specific revision')
.option('-f, --format <format>', 'Default: js when fetching a single entity, json otherwise. Note that the -j, --json option is equivalent to "--format json"')
.option('-m, --create-mode', 'optimize for creating an entity from a previously existing one, namely dropping ids from the existing entity used as template')
.option('-z, --no-minimize', 'disable claims minimization, making the output format more predictable; i.e. single claims will still be in arrays')
.process('generate-template')

const parseId = tolerantIdParserFactory()

const ids = program.args.map(parseId)
exitOnMissingInstance(program.instance)

const { getEntityRevision, getManyEntities } = getWbk(program)

const { revision, minimize } = program
let { format, json } = program
if (format == null && json) format = 'json'

const requestedPropsAndSubProps = parseProps(program.props)
const requestedProps = Object.keys(requestedPropsAndSubProps)

const requiredKeys = [ 'id', 'type', 'datatype', 'labels', 'descriptions', 'aliases', 'claims', 'sitelinks' ]

let propsToPick
if (revision && requestedProps.length > 0) {
  propsToPick = [ 'id' ].concat(requestedProps)
} else {
  propsToPick = requiredKeys
}

const handleIds = async ids => {
  ids.forEach(id => {
    if (!isEntityId(id)) throw new Error(`invalid entity id: ${id}`)
  })

  const batchMode = ids.length > 1

  if (batchMode && format === 'js') {
    throw new Error("js format can't be used when several entities are requested")
  }

  format = format || (batchMode ? 'json' : 'js')

  let urls
  if (revision) {
    if (ids.length !== 1) throw new Error(`requesting a revision for several entities isn't supported: ${ids}`)
    urls = [ getEntityRevision({ id: ids[0], revision }) ]
  } else {
    urls = getManyEntities({ ids, props: requestedProps })
  }

  return getEntitiesByBatches({
    urls,
    onResponse: outputTemplatesFactory({ batchMode, format, propsToPick, requestedPropsAndSubProps, minimize }),
  })
}

if (ids.length > 0) {
  handleIds(ids)
} else {
  readIdsFromStdin(handleIds)
}
