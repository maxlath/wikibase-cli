import { readdirSync } from 'node:fs'
import path from 'node:path'
import { getDirname } from '#lib/fs'

const getKeyFromFilename = filename => {
  return filename
  .replace(/_/g, '-')
  .replace('.js', '')
}

const list = readdirSync(path.join(getDirname(import.meta.url), '/queries')).map(getKeyFromFilename)

const getAbsolutePath = key => {
  const filename = key.replace(/-/g, '_') + '.js'
  return path.join(getDirname(import.meta.url), 'queries/' + filename)
}

export default { list, getAbsolutePath }
