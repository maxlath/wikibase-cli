import { resolve } from 'node:path'
import { getDirname } from '#lib/fs'
import { readJsonFile } from '#lib/json'

const dirname = getDirname(import.meta.url)
const { name, version } = readJsonFile(resolve(dirname, '../package.json'))

export default { 'User-Agent': `${name}/v${version}` }
