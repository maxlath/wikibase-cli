/**
 * Extends commander with options and functions used by all subcommands.
 */
const program = require('commander')
const chalk = require('chalk')
const config = require('./config')

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
    const examples = config.examples
    if (examples && examples.length) {
      program.on('--help', OnHelp(command, examples))
    }
  }
  program.parse(process.argv)
  program.lang = program.lang || config.lang || require('../lib/local_lang') || 'en'
}

function OnHelp (command, examples) {
  return function onHelp () {
    console.log('  Examples:')
    examples.forEach((example) => {
      const args = example.args
      const comment = example.comment
      console.log(chalk.dim(`\n    # ${comment}`))
      console.log(`    $ wd ${command} ${args}`)
    })
  }
}

// Prevent logging an EPIPE error when piping the output
// cf https://github.com/maxlath/wikidata-cli/issues/7
process.stdout.on('error', function (err) {
  if (err.code !== 'EPIPE') throw err
})

module.exports = program
