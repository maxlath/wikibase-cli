import { values } from 'lodash-es'
import { getStatementsKey } from 'wikibase-edit/lib/parse_instance.js'
import { simplifyClaim } from 'wikibase-sdk'
import { exitOnMissingInstance } from '#lib/exit_on_missing'
import optionsFactory from '#lib/parse_simplify_options'
import { get } from '#lib/request'
import { getWbk } from '#lib/wbk'
import { outputFactory } from './output.js'
import program from './program.js'

export async function fetchAndLogGuidData (guid) {
  exitOnMissingInstance(program.instance)
  const { getEntities } = getWbk(program)
  const options = optionsFactory(program)
  const { simplify: simplifyOption } = program
  const output = outputFactory(program)

  const id = guid.split('$')[0].toUpperCase()
  const url = getEntities({ ids: id, props: 'claims' })

  const { entities } = await get(url)
  const entity = entities[id]
  const statementsKey = getStatementsKey(program.instance)
  let claim = findClaim(entity[statementsKey], guid)
  if (!claim) throw new Error(`claim not found: ${guid}`)
  if (simplifyOption) claim = simplifyClaim(claim, options)
  output(claim)
}

const findClaim = (claims, guid) => {
  guid = guid.toLowerCase()
  for (const propertyClaims of values(claims)) {
    for (const claim of propertyClaims) {
      if (claim.id.toLowerCase() === guid) return claim
    }
  }
}
