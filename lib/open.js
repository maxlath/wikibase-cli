const copy = require('./copy')
const open = require('open')
const program = require('./program')
const { url: urlOnly, clipboard } = program

module.exports = url => {
  if (urlOnly) {
    clipboard ? copy(url) : console.log(url)
  } else {
    if (clipboard) copy(url)
    open(url, { url: true })
  }
}
