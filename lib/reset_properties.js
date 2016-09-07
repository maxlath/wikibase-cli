const exec = require('child_process').exec
const path = require('path')

module.exports = function () {
  const dir = path.resolve(__dirname, '../props')
  exec(`rm ${dir}/*.json`, function (err, res) {
    if (err) {
      console.error('reset properties failed', err)
    } else {
      console.log('properties reset')
    }
  })
}
