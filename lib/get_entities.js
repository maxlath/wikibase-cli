const program = require('./program')
require('./exit_on_missing').instance(program.instance)
const { getManyEntities } = require('./wbk')(program)
const { get } = require('./request')

module.exports = async params => {
  const urls = getManyEntities(params)
  const allEntities = {}
  for (const url of urls) {
    const { entities } = await get(url)
    for (const id in entities) {
      const entity = entities[id]
      // Do not include missing entity objects to allow simple existance tests
      if (entity && entity.missing == null) allEntities[id] = entity
    }
  }
  return allEntities
}
