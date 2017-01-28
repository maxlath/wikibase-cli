const { exec } = require('child_process')
const { green } = require('chalk')
const getCacheFolderPath = require('../lib/get_cache_folder_path')

module.exports = function () {
  return getCacheFolderPath('props')
  .then(function (propsDir) {
    exec(`rm ${propsDir}/*.json`, function (err, res) {
      if (err) {
        console.error('reset properties failed', err)
      } else {
        console.log(green('properties reset'))
      }
    })
  })
}
