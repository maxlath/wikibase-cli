/**
 * Extends commander with options and functions used by all subcommands.
 */
const program = require('commander')
const chalk = require('chalk')

program.process = (command) => {
  if (command) {
    const config = require(`../configs/${command}`)
    program.arguments(config.args)
    program.description(config.description)
    if (config.options.lang) {
      program.option('-l, --lang <lang>', 'specify the language to use')
    }
    const examples = config.examples
    if (examples && examples.length) {
      program.on('--help', OnHelp(command, examples))
    }
  }
  program.parse(process.argv)
  program.lang = program.lang || require('../lib/local_lang') || 'en'
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

module.exports = program
