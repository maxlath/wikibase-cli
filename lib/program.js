/**
 * Extends commander with options and functions used by all subcommands.
 */
const program = require('commander')
const fallbackToConfig = require('./fallback_to_config_options')
const logCommandExamples = require('./log_command_examples')

program.process = (command) => {
  if (command) {
    const { args, description, options, examples, doc } = require(`../metadata/${command}`)
    program.arguments(args)
    program.description(description)
    if (options.lang) {
      program.option('-l, --lang <lang>', 'specify the language to use')
    }
    program.option('-v, --verbose', 'make the output more verbose')
    program.option('-c, --clipboard', 'copy command results to the clipboard')
    program.option('-j, --json', 'output command results formatted as JSON')
    program.option('-i, --instance <url>', 'customize the Wikibase instance')
    program.option('-e, --sparql-endpoint <url>', 'customize the SPARQL endpoint')
    program.on('--help', logCommandExamples(command, examples, doc))
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
