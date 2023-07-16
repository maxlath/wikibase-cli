// Extends commander with options and functions used by all subcommands.

import program from 'commander'
import { applyEnvAndConfigDefault } from './apply_env_and_config_default.js'
import globalOptionsHelp from './global_options_help.js'
import logCommandExamples from './log_command_examples.js'

program.process = async command => {
  if (command) {
    const { default: metadata } = await import(`../metadata/${command}.js`)
    const { args, description, options, examples, doc } = metadata
    program.arguments(args)
    program.description(description)
    Object.keys(globalOptionsHelp).forEach(key => {
      if (options[key]) program.option(...globalOptionsHelp[key])
    })
    program.on('--help', () => logCommandExamples(command, examples, doc))
  }
  const isCommandsWithCustomHelpMenu = program.customHelpOption != null
  const { showHelp, argv } = parseArgv(process.argv, isCommandsWithCustomHelpMenu)
  program.parse(argv)
  if (isCommandsWithCustomHelpMenu) {
    program.showHelp = showHelp || (program.args.length === 0 && !program.batch)
  } else if (showHelp) {
    program.helpAndExit(0)
  } else if (program.args.length === 0 && !program.batch) {
    if (commandsTakingArgsOnStdin.includes(command)) {
      if (process.stdin.isTTY) program.helpAndExit(0)
    } else if (!commandsAcceptingZeroArguments.includes(command)) {
      program.helpAndExit(0)
    }
  }
  applyEnvAndConfigDefault(program)
}

const commandsAcceptingZeroArguments = [
  // Can be called without argument
  'props',
  'badges',
  // All arguments are passed as options values
  // making program.args.length === 0 likely
  'query',
  'convert',
  // Needs to also log the current config
  'config',
]

const commandsTakingArgsOnStdin = [
  'data',
  'generate-template',
]

const parseArgv = (argv, isCommandsWithCustomHelpMenu) => {
  // Make a copy to be able to mutate the array without affecting other operations
  // that might rely on that array being intact
  argv = argv.slice(0)
  let index
  if (argv.includes('-h')) {
    index = argv.indexOf('-h')
  } else if (argv.includes('--help')) {
    index = argv.indexOf('--help')
  }
  if (index != null) {
    if (isCommandsWithCustomHelpMenu) argv.splice(index, 1)
    return { showHelp: true, argv }
  } else {
    return { showHelp: false, argv }
  }
}

program.helpAndExit = exitCode => {
  program.help()
  process.exit(exitCode)
}

// Prevent logging an EPIPE error when piping the output
// cf https://github.com/maxlath/wikibase-cli/issues/7
process.stdout.on('error', err => {
  if (err.code === 'EPIPE') process.exit(0)
  else throw err
})

export default program
