const objectArgParser = require('./object_arg_parser')

module.exports = inlineArgsParser => args => {
  if (args.length === 1) return objectArgParser(args)
  else return inlineArgsParser(args)
}
