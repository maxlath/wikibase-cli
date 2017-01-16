module.exports = function (program) {
  const { verbose, clipboard, json } = program
  return function (data, optional, customColors) {
    const isArray = data instanceof Array
    const isPlainObject = !isArray && typeof data === 'object'
    const isCollection = isArray && typeof data[0] === 'object'
    if (optional) {
      if (!customColors) data = require('chalk').dim(data)
      if (verbose) console.log(data)
    } else {
      // collections can't give shell-ready outputs
      if (isArray && !isCollection && !json) {
        data = require('shell-quote').quote(data)
      } else if (json || isCollection || isPlainObject) {
        // indent deep objects
        data = JSON.stringify(data, null, 2)
      }
      if (clipboard) {
        require('./copy')(data)
      } else {
        console.log(data)
      }
    }
  }
}
