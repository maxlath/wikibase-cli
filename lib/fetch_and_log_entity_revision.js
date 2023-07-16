import { values } from 'lodash-es'
import { simplifyEntity } from 'wikibase-sdk'
import { exitOnMissingInstance } from '#lib/exit_on_missing'
import optionsFactory from '#lib/parse_simplify_options'
import { get } from '#lib/request'
import wbk from '#lib/wbk'
import program from './program.js'

exitOnMissingInstance(program.instance)

export async function fetchAndLogEntityRevision (id, revision) {
  const { getEntityRevision } = wbk(program)
  const { simplify: simplifyOption } = program
  const options = optionsFactory(program)
  const url = getEntityRevision({ id, revision })
  const body = await get(url)
  let entity = values(body.entities)[0]
  if (simplifyOption) entity = simplifyEntity(entity, options)
  console.log(JSON.stringify(entity))
}
