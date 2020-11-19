const program = require('./program')
require('./exit_on_missing').instance(program.instance)
const { isEntityId, getManyEntities } = require('./wbk')(program)
const errors_ = require('./errors')
const { get } = require('./request')
const { wait } = require('./utils')
const noop = () => {}

module.exports = ({ ids, props, languages, urls, onResponse, onDone = noop }) => {
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
    await wait(500)
    return getNextBatch()
  }

  return getNextBatch()
  .catch(errors_.exit)
}
