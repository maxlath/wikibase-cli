import { join, resolve } from '#lib/platform_agnostic_path'
import configFolderFactory from '../get_folder_path.js'
import { checkConfigFileExistance } from './check_config_file_existance.js'

export let configFilePath

const configFolder = configFolderFactory('config')

// Arguments parsing needs to be done manually as relying on lib/program
// would be a circular dependecy
const args = process.argv.slice(2)
const configArg = args.find(arg => arg.startsWith('--config'))
if (configArg) {
  let configFilePathFromArgs
  if (configArg.split('=')[1]) {
    configFilePathFromArgs = configArg.split('=')[1]
  } else {
    configFilePathFromArgs = args[args.indexOf(configArg) + 1]
  }
  configFilePath = resolve(process.cwd(), configFilePathFromArgs)
} else if (configFolder != null) {
  configFilePath = join(configFolder, 'config.json')
} else {
  configFilePath = null
}

if (configFilePath) await checkConfigFileExistance(configFilePath)
