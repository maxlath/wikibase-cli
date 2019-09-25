const lightGet = require('../lib/light_get')
const errors_ = require('../lib/errors')
const parseId = require('../lib/tolerant_id_parser')
const exitOnMissing = require('../lib/exit_on_missing')

module.exports = params => {
  const { commandName, props, parser, programOptions: options } = params
  const program = require('../lib/program')
  if (options) options.forEach(option => program.option(...option))
  program.process(commandName)

  exitOnMissing.instance(program.instance)

  const { getEntities } = require('../lib/wbk')(program)
  const output = require('../lib/output')(program)

  const { args, lang, strictLang } = program
  var ids = args.map(parseId)

  if (!(ids && ids.length > 0)) program.helpAndExit(0)

  if (ids.length > 1) program.clipboard = false

  const url = getEntities(ids, null, props)

  lightGet(url)
  .then(parseEntities(ids))
  .then(parser({ lang, strictLang, program, output }))
  .catch(errors_.exit)
}

const parseEntities = ids => body => {
  const { entities } = body
  ids.forEach(id => {
    if (entities[id].missing) throw errors_.new('entity not found', id)
  })
  return entities
}
