import program from 'commander'
import { objectArgParser } from '#lib/object_arg_parser'
import { isFilePathSync, isJsonString } from '#lib/utils'

const inlineOptions = [
  'rank',
]

const noInlineOptions = () => inlineOptions.filter(option => program[option] != null).length === 0

export function polymorphicCommandArgsParser ({ inlineArgsParser }) {
  return async function (args) {
    if ((args.length === 1 && isJsonString(args[0]) && noInlineOptions()) || isFilePathSync(args[0])) {
      return objectArgParser(args)
    } else {
      return inlineArgsParser(args)
    }
  }
}
