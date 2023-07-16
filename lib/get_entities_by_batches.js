import { isEntityId } from 'wikibase-sdk'
import { exitOnMissingInstance } from '#lib/exit_on_missing'
import errors_ from './errors.js'
import program from './program.js'
import { get } from './request.js'
import { wait } from './utils.js'
import wbk from './wbk.js'

const noop = () => {}

export async function getEntitiesByBatches ({ ids, props, languages, urls, onResponse, onDone = noop }) {
  exitOnMissingInstance(program.instance)
  const { getManyEntities } = wbk(program)

  if (ids != null) {
    ids.forEach(id => {
      if (!isEntityId(id)) throw new Error(`invalid entity id: ${id}`)
    })

    urls = getManyEntities({ ids, props, languages })
  }

  if (!urls) throw new Error('urls or ids required')

  // Fetch batches sequentially, and with some delay,
  // to be kind with the Wikibase API
  const getNextBatch = async () => {
    const url = urls.shift()

    // If url is undefined, all the batches got fetched, we are done
    if (url == null) return onDone()

    const { entities } = await get(url)
    onResponse(Object.values(entities))
    await wait(100)
    return getNextBatch()
  }

  return getNextBatch()
  .catch(errors_.exit)
}
