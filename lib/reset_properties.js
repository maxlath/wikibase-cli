const { exec } = require('child_process')
const { green } = require('chalk')
const getCacheFolderPath = require('../lib/get_cache_folder_path')

module.exports = () => {
  return getCacheFolderPath('props')
  .then(propsDir => {
    // --force: ignore if there are no more files to delete
    exec(`rm --force ${propsDir}/*.json`, (err, res) => {
      if (err) console.error('reset properties failed', err)
      else console.log(green('properties reset'))
    })
  })
}
