module.exports = function (program) {
  const { verbose, clipboard, json } = program
  return function (data, optional, customColors) {
    const isArray = data instanceof Array
    if (optional) {
      if (!customColors) data = require('chalk').dim(data)
      if (verbose) console.log(data)
    } else {
      if (isArray && !json) data = require('shell-quote').quote(data)
      if (clipboard) {
        require('./copy')(data)
      } else {
        console.log(data)
      }
    }
  }
}
