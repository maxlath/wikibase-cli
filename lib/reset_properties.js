const exec = require('child_process').exec
const path = require('path')
const chalk = require('chalk')

module.exports = function () {
  const dir = path.resolve(__dirname, '../props')
  exec(`rm ${dir}/*.json`, function (err, res) {
    if (err) {
      console.error('reset properties failed', err)
    } else {
      console.log(chalk.green('properties reset'))
    }
  })
}
