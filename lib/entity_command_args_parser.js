const fs = require('fs')
const { red } = require('chalk')
const path = require('path')

module.exports = args => {
  let arg = args[0]
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
        if (typeof jsModule === 'function') data = jsModule(...args.slice(1))
        else data = jsModule
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
