import fetch from 'node-fetch'
import { isEntitySchemaId } from 'wikibase-sdk'
import { exitOnMissingInstance } from '#lib/exit_on_missing'
import program from './program.js'

export function getEntitiesSchemas (ids) {
  exitOnMissingInstance(program.instance)
  const instanceDomain = program.instance.replace('/w/api.php', '')

  ids.forEach(id => {
    if (!isEntitySchemaId(id)) throw new Error(`invalid entity schema id: ${id}`)
  })

  let count = 0
  const multipleIds = ids.length > 1

  const getNext = async () => {
    const id = ids.shift()
    if (!id) return

    const url = `${instanceDomain}/wiki/Special:EntitySchemaText/${id}`
    const text = await fetch(url).then(res => res.text())
    if (multipleIds) {
      process.stdout.write(`${count++ === 0 ? '' : '\n'}## ${id} ##\n`)
    }
    process.stdout.write(text + '\n')
    return getNext()
  }

  return getNext()
  .catch(console.error)
}
