/**
 * Extends commander with options and functions used by all subcommands.
 */
const program = require('commander')
const strings = require('../lib/strings')

const help = program.help

program.option('-l, --lang <lang>', 'specify the language to use')
program.process = command => {
  if (command) {
    program.arguments(strings[command].args)
    program.description(strings[command].description)
    var examples = strings[command].examples
    if (examples && examples.length) {
      program.on('--help', () => {
        console.log('  Examples:');
        console.log('');
        examples.forEach( (example) => {
          console.log('    $ wd %s %s', command, example);
        })
        console.log('');
      })
    }
  }
  program.parse(process.argv)
  program.lang = program.lang || require('../lib/local_lang') || 'en'
}

module.exports = program
