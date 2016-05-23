var copy = require('copy-paste').copy
var exec = require('child_process').exec

// Force colors as playing with /dev/tty might disable it
require('colors').enabled = true
var label = 'copied to Clipboard: '.green
var options = ''

module.exports = function (text) {
  copy(text)

  // If stdout isn't the terminal
  // write a copy of the text to the terminal anyway
  if (!(process.stdout.isTTY)) {
    if (text.length > 20) {
      label += text.substring(0,20) + '...'
    } else {
      label += text
    }
  } else {
    options = '-n'
  }

  // Write directly to the terminal to avoid passing
  // "copied to Clipboard:" to process.stdout
  exec(`echo ${options} ${label} > /dev/tty`, function () {
    console.log(text)
    process.exit(0)
  })
}
