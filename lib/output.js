module.exports = function (program) {
  const { verbose, clipboard, json } = program
  return function (data, optional) {
    const isArray = data instanceof Array
    if (optional) {
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
