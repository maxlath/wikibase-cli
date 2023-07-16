import { resolve } from 'node:path'
import { getDirname } from './lib/fs.js'
import { readJsonFile } from './lib/json.js'

const dirname = getDirname(import.meta.url)
const { name } = readJsonFile(resolve(dirname, './package.json'))

throw new Error(`you can't require ${name}: this module only exposes executables (see "bin" in package.json)`)
