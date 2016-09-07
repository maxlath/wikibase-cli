var cb = require('copy2cb')

module.exports = function (text) {
  cb(text, function () {
    process.exit(0)
  })
}
