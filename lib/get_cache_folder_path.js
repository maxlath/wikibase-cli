// POSIX || Win32 (cf http://stackoverflow.com/a/41814643/3324977)
const homePath = process.env.HOME || process.env.USERPROFILE
const path = require('path')
const cacheFolder = path.join(homePath, '.cache/wikidata-cli')
const fs = require('./fs')

module.exports = function (subfolder) {
  const subfolderPath = `${cacheFolder}/${subfolder}`
  return fs.exists(subfolderPath)
  .catch(function (err) {
    if (err.code === 'ENOENT') {
      return fs.createFolder(subfolderPath)
    } else {
      throw err
    }
  })
  .then(() => subfolderPath)
}
