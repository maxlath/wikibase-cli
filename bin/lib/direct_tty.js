// Write directly to the terminal to avoid passing
// undesired logs to process.stdout

// Force colors as playing with /dev/tty might disable it
require('colors').enabled = true

var fs  = require('fs')
var ttyFound = true
var tty = fs.createWriteStream('/dev/tty')
tty.on('error', function (err) {
  if (err.code === 'EACCES') {
    ttyFound = false
  } else {
    throw err
  }
})

module.exports = {
  write: function (text, cb) {
    if (ttyFound) {
      tty.write(text, cb)
    } else {
      // ignore the text as we don't know where to write it
      cb()
    }
  }
}