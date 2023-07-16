import { createHash } from 'node:crypto'

export function hashString (str) {
  return createHash('md5').update(str).digest('hex')
}
