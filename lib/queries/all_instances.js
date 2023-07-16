import { isItemId } from 'wikibase-sdk'

export default id => {
  if (!isItemId(id)) throw new Error(`invalid id: ${id}`)

  return `SELECT ?item WHERE {
    ?item wdt:P31/wdt:P279* wd:${id} .
  }`
}
