const fs = require('fs')
const { red } = require('chalk')
const validateFunctionArgs = require('./validate_function_args')
const { parseGuid } = require('./parse_command_utils')
const { isFilePathSync, isJsonString, getAbsoluteFilePath } = require('../lib/utils')

module.exports = args => {
  const data = getData(args)
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
    return getJsonFile(filepath)
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

const getJsonFile = filepath => {
  const file = fs.readFileSync(filepath).toString()
  return JSON.parse(file)
}

const getDataFromJsModule = (filepath, args) => {
  const jsModule = require(filepath)
  if (typeof jsModule === 'function') {
    const inputArgs = args.slice(1)
    validateFunctionArgs(jsModule, inputArgs, jsModule)
    return jsModule(...inputArgs)
  } else if (jsModule && typeof jsModule.template === 'function') {
    const inputArgs = args.slice(1)
    validateFunctionArgs(jsModule.template, inputArgs, jsModule)
    return jsModule.template(...inputArgs)
  } else {
    return jsModule
  }
}
