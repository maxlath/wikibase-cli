const types = require('./types')
const config = require('./config')

module.exports = function (program) {
  const { verbose, clipboard, json } = program
  return function (data, optional, customColors) {
    const isArray = types.isArray(data)
    const isPlainObject = types.isPlainObject(data)
    const isCollection = types.isCollection(data)

    // Flatten when data is one array in an array to get a chance
    // to have a shell-friendly output
    if (isArray && data.length === 1 && types.isArray(data[0])) data = data[0]

    if (optional) {
      if (!customColors) data = require('chalk').dim(data)
      if (verbose) console.log(data)
    } else {
      // collections can't give shell-friendly outputs
      if (isArray && !isCollection && !json) {
        data = require('shell-quote').quote(data)
      } else if (json || isCollection || isPlainObject) {
        // indent deep objects
        data = JSON.stringify(data, null, 2)
      }
      if (clipboard || config.clipboard) {
        require('./copy')(data)
      } else {
        console.log(data)
      }
    }
  }
}
