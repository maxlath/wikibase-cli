const objectArgParser = require('./object_arg_parser')
const program = require('commander')

const inlineOptions = [
  'rank'
]

const someInlineOptions = () => inlineOptions.some(option => program[option] != null)

module.exports = inlineArgsParser => args => {
  if (args.length === 1 && !someInlineOptions()) {
    return objectArgParser(args)
  } else {
    return inlineArgsParser(args)
  }
}
