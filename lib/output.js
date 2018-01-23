const types = require('./types')

// Calling program just in time, so that code running
// after this first level function can still change the option
module.exports = program => (data, optional, customColors) => {
  const isArray = types.isArray(data)
  const isPlainObject = types.isPlainObject(data)
  const isCollection = types.isCollection(data)

  // Flatten when data is one array in an array to get a chance
  // to have a shell-friendly output
  if (isArray && data.length === 1 && types.isArray(data[0])) data = data[0]

  if (optional) {
    if (!customColors) data = require('chalk').dim(data)
    if (program.verbose) console.log(data)
  } else {
    // collections can't give shell-friendly outputs
    if (isArray && !isCollection && !program.json) {
      data = require('shell-quote').quote(data)
    } else if (program.json || isCollection || isPlainObject) {
      // indent deep objects
      data = JSON.stringify(data, null, 2)
      // Do not copy to clipboard when the output is valid JSON
      program.clipboard = false
    }
    if (program.clipboard) {
      if (isArray && data.length === 0) {
        console.error('no result found')
      } else {
        require('./copy')(data)
      }
    } else {
      console.log(data)
    }
  }
}
