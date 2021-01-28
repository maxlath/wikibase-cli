const objectArgParser = require('./object_arg_parser')
const program = require('commander')
const fs = require('fs')
const path = require('path')

const inlineOptions = [
  'rank'
]

const noInlineOptions = () => inlineOptions.filter(option => program[option] != null).length === 0

const isFilePath = arg => {
  const possibleFilePath = path.resolve(process.cwd(), arg)
  return fs.existsSync(possibleFilePath)
}

module.exports = inlineArgsParser => args => {
  if ((args.length === 1 && noInlineOptions()) || isFilePath(args[0])) {
    return objectArgParser(args)
  } else {
    return inlineArgsParser(args)
  }
}
