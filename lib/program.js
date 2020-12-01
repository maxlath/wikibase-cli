// Extends commander with options and functions used by all subcommands.

const program = require('commander')
const applyEnvAndConfigDefault = require('./apply_env_and_config_default')
const logCommandExamples = require('./log_command_examples')
const globalOptionsHelp = require('./global_options_help')

program.process = command => {
  if (command) {
    const metadata = require(`../metadata/${command}`)
    const { args, description, options, examples, doc } = metadata
    program.arguments(args)
    program.description(description)
    Object.keys(globalOptionsHelp).forEach(key => {
      if (options[key]) program.option(...globalOptionsHelp[key])
    })
    program.on('--help', () => logCommandExamples(command, examples, doc))
  }
  const isCommandsWithCustomHelpMenu = commandsWithCustomHelpMenu.includes(command)
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
  // All arguments are passed as options values
  // making program.args.length === 0 likely
  'query',
  'convert',
  // Needs to also log the current config
  'config'
]

const commandsTakingArgsOnStdin = [
  'data',
  'generate-template'
]

const commandsWithCustomHelpMenu = [
  // Required to be able to show help for templates
  'edit-entity',
  'create-entity',
  'sparql',
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

module.exports = program
