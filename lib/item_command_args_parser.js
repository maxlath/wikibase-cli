const fs = require('fs')
const { red } = require('chalk')

module.exports = args => {
  let arg = args[0]
  let data
  try {
    // Accept the item data as a JSON string
    if (arg[0] === '{') {
      data = arg
    // Or as a file path
    } else {
      data = fs.readFileSync(arg).toString()
    }
    return [ JSON.parse(data) ]
  } catch (err) {
    console.error(red('the argument should be a valid JSON or a JSON file path'), arg)
    process.exit(1)
  }
}
