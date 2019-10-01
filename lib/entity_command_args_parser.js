const fs = require('fs')
const { red } = require('chalk')
const path = require('path')

module.exports = args => {
  let arg = args[0]
  let data

  // Try to parse it as inline JSON
  try {
    data = JSON.parse(arg)
  } catch (err1) {
    // Try to parse it as a JSON file
    try {
      const file = fs.readFileSync(arg).toString()
      data = JSON.parse(file)
    } catch (err2) {
      // Try to parse it as a JS module
      try {
        const jsPath = path.resolve(arg)
        const jsModule = require(jsPath)
        if (typeof jsModule === 'function') data = jsModule(...args.slice(1))
        else data = jsModule
      } catch (err3) {
        if (err3 === 'SyntaxError') {
          console.error(red('the argument should be a valid JSON or a JSON file path or a JS function file path'))
          console.error('not inline JSON:', err1)
          console.error('not JSON file:', err2)
          console.error('not JS file:', err3)
        } else {
          console.error(err3)
        }
        process.exit(1)
      }
    }
  }

  return [ data ]
}
