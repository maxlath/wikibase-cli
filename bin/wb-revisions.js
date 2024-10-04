#!/usr/bin/env node
import { values } from 'lodash-es'
import { isEntityId } from 'wikibase-sdk'
import errors_ from '#lib/errors'
import { exitOnMissingInstance } from '#lib/exit_on_missing'
import logNdjson from '#lib/log_ndjson'
import program from '#lib/program'
import { get } from '#lib/request'
import { isPositiveIntegerString } from '#lib/types'
import { getWbk } from '#lib/wbk'

await program
.option('-s, --start <date>', 'start date')
.option('-e, --end <date>', 'end date')
.option('-n, --limit <num>', 'maximum number of revisions')
.option('-p, --props <props>', 'requested props, separated by a comma. Available props: https://www.mediawiki.org/wiki/API:Revisions#query+revisions:rvprop')
.process('revisions')

exitOnMissingInstance(program.instance)

const { getRevisions } = getWbk(program)

// Not parsing the ids with ../lib/tolerant_id_parser as that would
// remove prefixes which are required for entities out of the main namespace
// Ex: Property:P570
const ids = program.args
if (!(ids && ids.length > 0)) program.helpAndExit(0)

ids.forEach(id => {
  let [ prefix, entityId ] = id.split(':')
  if (entityId) {
    if (prefix !== 'Property' && prefix !== 'Item') {
      throw new Error(`invalid entity prefix: ${prefix}`)
    }
  } else {
    entityId = prefix
  }
  if (!isEntityId(entityId)) throw new Error(`invalid entity id: ${id}`)
})

const query = {}
let { start, end, limit, props, verbose } = program
if (isPositiveIntegerString(start)) start = parseInt(start)
if (isPositiveIntegerString(end)) end = parseInt(end)

query.start = start
query.end = end
query.limit = limit
if (props) query.prop = props?.split(',')

const getAndLogRevisions = id => {
  const url = getRevisions({ ids: [ id ], ...query })
  if (verbose) console.log(`revision query: ${id}`, url)
  return get(url)
  .then(body => values(body.query.pages)[0])
}

if (ids.length === 1) {
  getAndLogRevisions(ids[0])
  .then(data => console.log(JSON.stringify(data)))
  .catch(errors_.exit)
} else {
  // Getting revisisions data individually to be able to pass parameters
  // cf https://github.com/maxlath/wikibase-sdk/blob/master/docs/get_revisions.md
  Promise.all(ids.map(getAndLogRevisions))
  .then(logNdjson)
  .catch(errors_.exit)
}
