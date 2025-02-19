#!/usr/bin/env node
import { getStatementsKey } from 'wikibase-edit/lib/parse_instance.js'
import { isPropertyId, simplifyClaims, simplifyPropertyClaims } from 'wikibase-sdk'
import { yellow } from '#lib/chalk'
import errors_ from '#lib/errors'
import { exitOnMissingInstance } from '#lib/exit_on_missing'
import getEntities from '#lib/get_entities'
import { getEntityLabel } from '#lib/get_entities_labels'
import logClaims from '#lib/log_claims'
import { outputFactory } from '#lib/output'
import program from '#lib/program'
import { tolerantIdParserFactory } from '#lib/tolerant_id_parser'

await program
.option('-a, --all', 'include all claims, not only the truthy ones')
.option('-t, --type <type>', 'Keep only claims with the specified datatype')
.process('claims')

const parseId = tolerantIdParserFactory()
exitOnMissingInstance(program.instance)

let [ id, ...filter ] = program.args
id = id && parseId(id)

let prop, value, pattern
if (isPropertyId(filter[0])) {
  prop = filter[0]
  value = filter[1]
} else {
  pattern = filter.join(' ')
}

const { lang } = program
const output = outputFactory(program)

if (!(id && lang)) program.helpAndExit(0)

// Working around a weird behavior of commander that inverts arguments
// when an option is passed before
if (id && prop && id[0] === 'P' && prop[0] === 'Q') {
  [ id, prop ] = [ prop, id ]
}

const run = async () => {
  const entities = await getEntities({ props: 'claims', ids: [ id ] })
  const entity = entities[id]
  if (!entity) {
    errors_.exitMessage(`entity not found: ${program.instance}/entity/${id}`)
  }

  const statementsKey = getStatementsKey(program.instance)
  const keepNonTruthy = program.all === true
  if (isPropertyId(prop) && value != null) {
    const propClaims = entity[statementsKey][prop]
    if (!propClaims) throw new Error(`no claims found for this property: ${prop}`)
    const ids = simplifyPropertyClaims(propClaims, { keepIds: true, keepNonTruthy })
      .filter(simplifyClaim => simplifyClaim.value === value)
      .map(simplifyClaim => simplifyClaim.id)
    return output(ids)
  }

  const simplifiedClaims = simplifyClaims(entity[statementsKey], { keepNonTruthy, keepTypes: true })
  if (!prop) return logClaims({ program, simplifiedClaims, pattern, resort: true })

  if (simplifiedClaims[prop] != null) {
    const values = simplifiedClaims[prop].map(({ value }) => value)
    return output(values)
  }

  const label = await getEntityLabel(prop)
  console.log(yellow('no statement found'), label)
}

run()
.catch(errors_.exit)
