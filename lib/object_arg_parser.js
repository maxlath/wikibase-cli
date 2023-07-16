import { red } from '#lib/chalk'
import { readJsonFile } from '#lib/json'
import { isFilePathSync, isJsonString, getAbsoluteFilePath, validateTemplateCommand } from '#lib/utils'
import { parseGuid } from './parse_command_utils.js'
import program from './program.js'
import validateFunctionArgs from './validate_function_args.js'

export async function objectArgParser (args) {
  const data = await getData(args)
  if (data == null) return []
  if (data.guid != null) data.guid = parseGuid(data.guid)
  return [ data ]
}

const getData = args => {
  const arg = args[0]

  if (isJsonString(arg)) {
    // Try to parse it as inline JSON
    return JSON.parse(arg)
  }

  const filepath = getAbsoluteFilePath(arg)

  if (!isFilePathSync(filepath)) {
    console.error(red('the argument should be a valid JSON or a JSON file path or a JS function file path'))
    console.error("- it doesn't look like inline JSON")
    console.error(`couldn't parse arguments: ${filepath} is not the path to an existing file`)
    process.exit(1)
  }

  try {
    // Try to parse it as a JSON file
    return readJsonFile(filepath)
  } catch (err1) {
    // Try to parse it as a JS module
    try {
      return getDataFromJsModule(filepath, args)
    } catch (err2) {
      if (err2 === 'SyntaxError') {
        console.error(red('the argument should be a valid JSON or a JSON file path or a JS function file path'))
        console.error("- it doesn't look like inline JSON")
        console.error("- it's not a valid JSON file:", err1)
        console.error("- it's not a valid JS file:", err2)
      } else {
        console.error(err2)
      }
      process.exit(1)
    }
  }
}

async function getDataFromJsModule (filepath, args) {
  const { default: jsModule } = await import(filepath)
  if (typeof jsModule === 'function') {
    const inputArgs = args.slice(1)
    validateFunctionArgs(jsModule, inputArgs, jsModule)
    return jsModule(...inputArgs)
  } else if (jsModule && typeof jsModule.template === 'function') {
    validateTemplateCommand({
      commandName: program._name.replace('wb-', ''),
      validCommands: jsModule.commands,
    })
    const inputArgs = args.slice(1)
    validateFunctionArgs(jsModule.template, inputArgs, jsModule)
    return jsModule.template(...inputArgs)
  } else {
    return jsModule
  }
}
