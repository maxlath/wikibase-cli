#!/usr/bin/env node
import { isGuid, isPropertyClaimsId } from 'wikibase-sdk'
import { parseGuid } from '#lib/parse_command_utils'
import program from '#lib/program'
import { tolerantIdParserFactory } from '#lib/tolerant_id_parser'

program.acceptsArgsOnStdin = true

await program
.option('-s, --simplify', 'get simplified entities data')
.option('-k, --keep <props>', 'data to keep when simplifying claims (ids,richvalues,types,references,qualifiers,hashes,nontruthy,nondeprecated,ranks)')
.option('--time-converter <converter>', 'specify which time format should be used when simplifying')
.option('-p, --props <props>', 'request only certain properties (info,sitelinks,aliases,labels,descriptions,claims,datatype)')
.option('-r, --revision <id>', 'request a specific revision')
.option('-f, --format <format>', 'Default: ndjson. Alternatives: ttl')
.process('data')

const firstArg = program.args[0]

let guid
if (firstArg && isGuid(parseGuid(firstArg))) guid = parseGuid(firstArg)

if (program.args.length === 1 && guid) {
  const { fetchAndLogGuidData } = await import('#lib/fetch_and_log_guid_data')
  fetchAndLogGuidData(guid)
} else if (program.args.length === 1 && isPropertyClaimsId(firstArg)) {
  const { fetchAndLogPropertyClaimsData } = await import('#lib/fetch_and_log_property_claims_data')
  fetchAndLogPropertyClaimsData(firstArg)
} else {
  const parseId = tolerantIdParserFactory({ allowEntitiesSchemasIds: true })
  const ids = program.args.map(parseId)
  const { revision } = program

  if (revision) {
    if (ids.length === 1) {
      const { fetchAndLogEntityRevision } = await import('#lib/fetch_and_log_entity_revision')
      fetchAndLogEntityRevision(ids[0], revision)
    } else {
      throw new Error('a revision can be specified when only one entity is fetched')
    }
  } else {
    // process.stdin.isTTY will be undefined if the process is receiving
    // its stdin from another process
    if (ids.length === 0 && process.stdin.isTTY) program.helpAndExit(0)

    const { fetchAndLogIdsData } = await import('#lib/fetch_and_log_ids_data')

    if (ids.length > 0) {
      fetchAndLogIdsData(ids)
    } else {
      const { readIdsFromStdin } = await import('#lib/read_ids_from_stdin')
      readIdsFromStdin(fetchAndLogIdsData)
    }
  }
}
