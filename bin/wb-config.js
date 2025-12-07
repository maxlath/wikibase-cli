#!/usr/bin/env node
import { green } from '#lib/chalk'
import { checkConfigFileExistance } from '#lib/config/check_config_file_existance'
import { config } from '#lib/config/config'
import { configurateCredentials } from '#lib/config/credentials_config'
import fileOps from '#lib/config/file_operations'
import { configFilePath } from '#lib/config/file_path'
import program from '#lib/program'

program.canHaveZeroArguments = true

await program.process('config')

if (configFilePath && process.stdout.isTTY) await checkConfigFileExistance(configFilePath)

const { args, json } = program

if (args.length === 0) {
  if (json) {
    console.log(JSON.stringify(config, null, 2))
    process.exit(0)
  } else {
    const currentConfig = JSON.stringify(config, null, 2)
    console.log(`${green('Config path:')} ${configFilePath}`)
    console.log(`${green('Current config:')} ${currentConfig}\n`)
    program.helpAndExit(0)
  }
}

const [ key, value, value2 ] = args

if (key === 'path') {
  console.log(fileOps.configFilePath)
} else if (key === 'clear' || key === 'reset') {
  fileOps.clear()
} else if (key === 'credentials') {
  configurateCredentials(value, value2)
} else if (value == null) {
  console.log(fileOps.get(key))
} else {
  fileOps.set(key, value)
}
