import { resolve } from 'node:path'
import { getDirname } from '#lib/fs'
import { readJsonFile } from '#lib/json'

const dirname = getDirname(import.meta.url)
const { name, version, repository } = readJsonFile(resolve(dirname, '../package.json'))

const url = repository.url
  .replace(/^git\+/, '')
  .replace(/\.git$/, '')

const userAgent = `${name}/v${version} (${url})`

export const globalRequestHeaders = {
  'User-Agent': userAgent,
  // Recommanded in https://www.wikidata.org/wiki/Wikidata:Data_access#Access_best_practices
  'Accept-Encoding': 'gzip,deflate',
}
