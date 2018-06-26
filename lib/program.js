/**
 * Extends commander with options and functions used by all subcommands.
 */
process.on('unhandledRejection', (reason, promise) => console.log(reason))
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
  applyEnvAndConfigDefault(program)
}

// Prevent logging an EPIPE error when piping the output
// cf https://github.com/maxlath/wikidata-cli/issues/7
process.stdout.on('error', function (err) {
  if (err.code !== 'EPIPE') throw err
})

module.exports = program
