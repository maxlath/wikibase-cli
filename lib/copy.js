const { copy } = require('copy-paste')

module.exports = text => {
  copy(text, () => {
    console.log(text)
    process.exit(0)
  })
}
