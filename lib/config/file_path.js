import { accessSync, writeFileSync } from 'node:fs'
import configFolderFactory from '../get_folder_path.js'
import path from '../path.js'

const configFolder = configFolderFactory('config')

export let configFilePath

if (configFolder != null) {
  configFilePath = path.join(configFolder, 'config.json')

  try {
    accessSync(configFilePath)
  } catch (err) {
    // Initialize if it doesn't exist
    writeFileSync(configFilePath, '{}', { mode: 0o600 })
  }
} else {
  configFilePath = null
}
