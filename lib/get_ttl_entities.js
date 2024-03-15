import crypto from 'node:crypto'
import { isEntityId } from 'wikibase-sdk'
import { exitOnMissingInstance } from '#lib/exit_on_missing'
import program from '#lib/program'

export default ids => {
  exitOnMissingInstance(program.instance)
  const instanceDomain = program.instance.replace('/w/api.php', '')

  ids.forEach(id => {
    if (!isEntityId(id)) throw new Error(`invalid entity id: ${id}`)
  })

  const getNext = () => {
    const id = ids.shift()
    if (!id) return

    return fetch(`${instanceDomain}/wiki/Special:EntityData/${id}.ttl`)
    .then(res => res.text())
    .then(logUniqueBlocks)
    .then(getNext)
  }

  return getNext()
  .catch(console.error)
}

const blocksHashes = {}

const logUniqueBlocks = ttl => {
  ttl.split('\n\n')
  .forEach(block => {
    const hash = getStringHash(block)
    if (blocksHashes[hash]) return
    console.log(block + '\n')
    blocksHashes[hash] = true
  })
}

const getStringHash = str => crypto.createHash('sha1').update(str).digest('base64')
