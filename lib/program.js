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

    program.on('--help', logCommandExamples(command, examples, doc))
  }
  program.parse(process.argv)
  if (program.args.length === 0 && !commandsControllingTheirHelpMenu.includes(command) && !program.batch) {
    program.helpAndExit(0)
  }
  applyEnvAndConfigDefault(program)
}

const commandsControllingTheirHelpMenu = [
  // Can be called without argument
  'props',
  // Accepts ids on stdin
  'data',
  'generate-template',
  // All arguments are passed as options values
  // making program.args.length === 0 likely
  'query',
  'convert',
  // Needs to also log the current config
  'config'
]

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
