#!/usr/bin/env node
import { green } from '#lib/chalk'
import { config } from '#lib/config/config'
import { configurateCredentials } from '#lib/config/credentials_config'
import fileOps from '#lib/config/file_operations'
import program from '#lib/program'

program.canHaveZeroArguments = true

await program.process('config')

const { args, json } = program

if (args.length === 0) {
  if (json) {
    console.log(JSON.stringify(config, null, 2))
    process.exit(0)
  } else {
    const currentConfig = JSON.stringify(config, null, 2)
    console.log(`${green('Current config:')}\n\n${currentConfig}\n`)
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
