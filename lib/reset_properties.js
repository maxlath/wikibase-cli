const exec = require('child_process').exec
module.exports = function () {
  const dir = __dirname.replace('lib', 'props')
  exec(`rm ${dir}/*.json`, function (err, res) {
    if (err) {
      console.error('reset properties failed', err)
    } else {
      console.log('properties reset')
    }
  })
}