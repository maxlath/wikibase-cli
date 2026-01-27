#!/usr/bin/env node
import { chunk, values } from 'lodash-es'
import { isEntityId } from 'wikibase-sdk'
import errors_ from '#lib/errors'
import { exitOnMissingInstance } from '#lib/exit_on_missing'
import logNdjson from '#lib/log_ndjson'
import program from '#lib/program'
import { get } from '#lib/request'
import { isPositiveIntegerString } from '#lib/types'
import { getWbk } from '#lib/wbk'

program.acceptsArgsOnStdin = true

await program
.option('-s, --start <date>', 'Start date')
.option('-e, --end <date>', 'End date')
.option('-n, --limit <num>', 'Maximum number of revisions')
.option('-p, --props <props>', 'Requested props, separated by a comma. Available props: https://www.mediawiki.org/wiki/API:Revisions#query+revisions:rvprop')
.option('-u, --user <username>', 'User that made the revision')
.process('revisions')

exitOnMissingInstance(program.instance)

const { getRevisions } = getWbk(program)

async function fetchAndLogRevisions (ids) {
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
  let { start, end, limit, props, user, verbose } = program
  if (isPositiveIntegerString(start)) start = parseInt(start)
  if (isPositiveIntegerString(end)) end = parseInt(end)

  if (start != null) query.start = start
  if (end != null) query.end = end
  if (limit != null) query.limit = limit
  if (props != null) query.prop = props?.split(/[,|]/)
  if (user != null) query.user = user

  // Prevent error "titles, pageids or a generator was used to supply multiple pages, but the rvlimit, rvstartid, rvendid, rvdir=newer, rvuser, rvexcludeuser, rvstart, and rvend parameters may only be used on a single page. "
  const usesSinglePageParam = limit != null || start != null || end != null || user != null

  async function getAndLogRevisions (ids) {
    const url = getRevisions({ ids, ...query })
    if (verbose) console.log(`revision query: ${ids}`, url)
    const body = await get(url)
    return values(body.query.pages)
  }

  if (usesSinglePageParam) {
    for (const id of ids) {
      // Getting revisisions data individually to be able to pass parameters
      // cf https://github.com/maxlath/wikibase-sdk/blob/master/docs/get_revisions.md
      await Promise.all([ getAndLogRevisions(id) ])
      .then(logNdjson)
      .catch(errors_.exit)
    }
  } else {
    const idsBatches = chunk(ids, 50)
    for (const batch of idsBatches) {
      await getAndLogRevisions(batch)
      .then(logNdjson)
      .catch(errors_.exit)
    }
  }
}

// process.stdin.isTTY will be undefined if the process is receiving
// its stdin from another process
if (program.args.length === 0 && process.stdin.isTTY) {
  program.helpAndExit(0)
} else if (program.args.length > 0) {
  // Not parsing the ids with ../lib/tolerant_id_parser as that would
  // remove prefixes which are required for entities out of the main namespace
  // Ex: Property:P570
  const ids = program.args
  fetchAndLogRevisions(ids)
} else {
  const { readIdsFromStdin } = await import('#lib/read_ids_from_stdin')
  readIdsFromStdin(fetchAndLogRevisions)
}
