/**
 * Extends commander with options and functions used by all subcommands.
 */
const program = require('commander')
const strings = require('../lib/strings')
const options = require('../lib/options')

program.process = (command) => {
  if (command) {
    program.arguments(strings[command].args)
    program.description(strings[command].description)
    const examples = strings[command].examples
    if (examples && examples.length) {
      program.on('--help', OnHelp(command, examples))
    }
    if (options[command].lang) {
      program.option('-l, --lang <lang>', 'specify the language to use')
    }
  }
  program.parse(process.argv)
  program.lang = program.lang || require('../lib/local_lang') || 'en'
}

function OnHelp (command, examples) {
  return function onHelp () {
    console.log('  Examples:')
    examples.forEach((example) => {
      console.log('\n    $ wd %s %s\n', command, example)
    })
  }
}

module.exports = program
