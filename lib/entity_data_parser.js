const lightGet = require('../lib/light_get')
const errors_ = require('../lib/error')
const parseId = require('../lib/tolerant_id_parser')

module.exports = function (params) {
  const { commandName, props, parser, programOptions: options } = params
  const program = require('../lib/program')
  if (options) options.forEach(option => program.option(...option))
  program.process(commandName)

  const wdk = require('../lib/customized_wdk')(program)
  const output = require('../lib/output')(program)

  const { args, lang } = program
  var ids = args.map(parseId)

  if (!(ids && ids.length > 0)) return program.help()

  if (ids.length > 1) program.clipboard = false

  const url = wdk.customize('getEntities', ids, null, props)

  lightGet(url)
  .then(parseEntities(ids))
  .then(parser({ lang, program, output }))
  .catch(errors_.exit)
}

const parseEntities = ids => body => {
  const { entities } = body
  ids.forEach(id => {
    if (entities[id].missing) throw errors_.new('entity not found', id)
  })
  return entities
}
