import { isEntityId } from 'wikibase-sdk'
import errors_ from './errors.js'

export function generateDescribeSparqlQuery (describe) {
  if (describe.startsWith('http')) return `DESCRIBE <${describe}>`
  if (isEntityId(describe)) return `DESCRIBE wd:${describe}`
  throw errors_.new('could not identify describe node type', 400, { describe })
}
