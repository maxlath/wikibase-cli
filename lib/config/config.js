import { red } from 'tiny-chalk'
import { readJsonFile } from '#lib/json'
import { configFilePath } from './file_path.js'

const isEnvTest = process.env.NODE_ENV === 'tests'

export let config = {}

// Neutralize the local config for tests
if (!isEnvTest) {
  // Fallback to an empty config if no config path could be determined,
  if (configFilePath) {
    try {
      config = readJsonFile(configFilePath)
    } catch (err) {
      // or no file can be found there
      if (err.code !== 'ENOENT') {
        console.error(red('failed to read config file'), configFilePath)
        throw err
      }
    }
  }
}
