var cb = require('copy2cb')

module.exports = text => {
  cb(text, () => {
    process.exit(0)
  })
}
