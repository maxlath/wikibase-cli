import errors_ from '#lib/errors'
import { exitOnMissingInstance } from '#lib/exit_on_missing'
import { outputFactory } from '#lib/output'
import program from '#lib/program'
import { get } from '#lib/request'
import { tolerantIdParserFactory } from '#lib/tolerant_id_parser'
import { getWbk } from '#lib/wbk'

const parseId = tolerantIdParserFactory()

export async function entityDataParser (params) {
  const { commandName, parser, programOptions: options } = params
  let { ids, props } = params

  // If no commandName has been specified, assume that the options
  // where already parsed and that program.process has already been called
  if (commandName) {
    if (options) options.forEach(option => program.option(...option))
    await program.process(commandName)
  }

  exitOnMissingInstance(program.instance)

  const { getManyEntities } = getWbk(program)
  const output = outputFactory(program)

  const { args, lang, strictLang } = program

  if (!ids) ids = args.map(parseId)

  if (!(ids && ids.length > 0)) program.helpAndExit(0)

  if (ids.length > 1) program.clipboard = false

  // The API doesn't accept lemmas at the moment (2020-04-18)
  if (props && props[0] === 'lemmas') props = [ 'info' ]

  const urls = getManyEntities({ ids, props })
  const entities = {}
  for (const url of urls) {
    const body = await get(url)
    Object.assign(entities, body.entities)
  }
  ids.forEach(id => {
    if (entities[id].missing) throw errors_.new('entity not found', id)
  })
  return parser({ lang, strictLang, program, output, entities })
  .catch(errors_.exit)
}
