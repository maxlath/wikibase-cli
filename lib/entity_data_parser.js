const { get } = require('../lib/request')
const errors_ = require('../lib/errors')
const parseId = require('../lib/tolerant_id_parser')()
const exitOnMissing = require('../lib/exit_on_missing')

module.exports = async params => {
  const { commandName, parser, programOptions: options } = params
  let { ids, props } = params
  const program = require('../lib/program')

  // If no commandName has been specified, assume that the options
  // where already parsed and that program.process has already been called
  if (commandName) {
    if (options) options.forEach(option => program.option(...option))
    program.process(commandName)
  }

  exitOnMissing.instance(program.instance)

  const { getEntities } = require('../lib/wbk')(program)
  const output = require('../lib/output')(program)

  const { args, lang, strictLang } = program

  if (!ids) ids = args.map(parseId)

  if (!(ids && ids.length > 0)) program.helpAndExit(0)

  if (ids.length > 1) program.clipboard = false

  // The API doesn't accept lemmas at the moment (2020-04-18)
  if (props && props[0] === 'lemmas') props = [ 'info' ]

  const url = getEntities({ ids, props })

  const body = await get(url)
  const entities = parseEntities(ids, body)
  return parser({ lang, strictLang, program, output, entities })
  .catch(errors_.exit)
}

const parseEntities = (ids, body) => {
  const { entities } = body
  ids.forEach(id => {
    if (entities[id].missing) throw errors_.new('entity not found', id)
  })
  return entities
}
