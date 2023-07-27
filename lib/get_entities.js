import { getWbk } from '#lib/wbk'
import program from './program.js'
import { get } from './request.js'

export default async params => {
  // JIT require to be sure program.process was already called
  // and program.instance is set
  const { getManyEntities } = getWbk(program)

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
