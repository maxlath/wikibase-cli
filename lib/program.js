/**
 * Extends commander with options and functions used by all subcommands.
 */
const program = require('commander')
const fallbackToConfig = require('./fallback_to_config_options')
const logCommandExamples = require('./log_command_examples')

program.process = (command) => {
  if (command) {
    const config = require(`../configs/${command}`)
    program.arguments(config.args)
    program.description(config.description)
    if (config.options.lang) {
      program.option('-l, --lang <lang>', 'specify the language to use')
    }
    program.option('-v, --verbose', 'make results more verbose')
    program.option('-c, --clipboard', 'copy the result to clipboard')
    program.option('-j, --json', 'output result as json')
    program.option('-i, --instance <url>', 'customize the Wikibase instance')
    program.on('--help', logCommandExamples(command, config.examples))
  }
  program.parse(process.argv)
  fallbackToConfig(program)
}

// Prevent logging an EPIPE error when piping the output
// cf https://github.com/maxlath/wikidata-cli/issues/7
process.stdout.on('error', function (err) {
  if (err.code !== 'EPIPE') throw err
})

module.exports = program
