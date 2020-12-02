const fs = require('fs')
const { red } = require('chalk')
const path = require('path')
const validateFunctionArgs = require('./validate_function_args')

module.exports = args => {
  const arg = args[0]
  let data

  if (arg.trim().startsWith('{')) {
    // Try to parse it as inline JSON
    data = JSON.parse(arg)
  } else {
    try {
      // Try to parse it as a JSON file
      const file = fs.readFileSync(arg).toString()
      data = JSON.parse(file)
    } catch (err1) {
      // Try to parse it as a JS module
      try {
        const jsPath = path.resolve(arg)
        const jsModule = require(jsPath)
        if (typeof jsModule === 'function') {
          const inputArgs = args.slice(1)
          validateFunctionArgs(jsModule, inputArgs, jsModule)
          data = jsModule(...inputArgs)
        } else {
          if (jsModule && typeof jsModule.template === 'function') {
            const inputArgs = args.slice(1)
            validateFunctionArgs(jsModule.template, inputArgs, jsModule)
            data = jsModule.template(...inputArgs)
          } else {
            data = jsModule
          }
        }
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

  return [ data ]
}
