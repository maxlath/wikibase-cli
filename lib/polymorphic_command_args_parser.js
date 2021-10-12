const objectArgParser = require('./object_arg_parser')
const program = require('commander')
const { isFilePathSync, isJsonString } = require('../lib/utils')

const inlineOptions = [
  'rank'
]

const noInlineOptions = () => inlineOptions.filter(option => program[option] != null).length === 0

module.exports = inlineArgsParser => args => {
  if ((args.length === 1 && isJsonString(args[0]) && noInlineOptions()) || isFilePathSync(args[0])) {
    return objectArgParser(args)
  } else {
    return inlineArgsParser(args)
  }
}
