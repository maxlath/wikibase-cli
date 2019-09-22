const fs = require('fs')
const { red } = require('chalk')
const path = require('path')

module.exports = args => {
  let arg = args[0]
  let data
  try {
    // Accept the item data as a JSON string
    if (arg[0] === '{') {
      data = JSON.parse(arg)
    } else if (arg.match(/\.js$/)) {
      // Or as a JS module that either exports an object or a function
      const jsPath = path.resolve(arg)
      const jsModule = require(jsPath)
      if (typeof jsModule === 'function') data = jsModule(...args.slice(1))
      else data = jsModule
    } else {
      // Or as a file path
      const file = fs.readFileSync(arg).toString()
      data = JSON.parse(file)
    }
    return [ data ]
  } catch (err) {
    console.error(red('the argument should be a valid JSON or a JSON file path or a JS function file path'))
    console.error(err)
    process.exit(1)
  }
}
