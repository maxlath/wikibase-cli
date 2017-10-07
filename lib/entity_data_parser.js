module.exports = function (params) {
  const { commandName, props, parser } = params
  const program = require('../lib/program')
  program.process(commandName)

  const wdk = require('../lib/customized_wdk')(program)
  const lightGet = require('../lib/light_get')
  const error_ = require('../lib/error')
  const parseId = require('../lib/tolerant_id_parser')
  const output = require('../lib/output')(program)

  const { args } = program

  var id = parseId(args[0])
  output(`found id: ${id}`, true)
  const { lang } = program

  if (!(id && lang)) return program.help()

  const url = wdk.customize('getEntities', id, null, props)

  lightGet(url)
  .then(parseEntity(id))
  .then(entity => parser(entity, { id, lang, program, output }))
  .catch(error_.log)
}

const parseEntity = id => body => {
  const entity = body.entities[id]
  if (entity.missing != null) throw new Error(`entity not found: ${id}`)
  return entity
}
