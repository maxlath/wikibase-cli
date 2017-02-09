const path = require('path')
const fs = require('./fs')

var cacheFolder = path.resolve(__dirname, '../cache')

try {
  fs.writeAccessSync(cacheFolder)
} catch (err) {
  if (err.code !== 'EACCES') throw err
  // If writing fails because we don't have the access rights
  // try writting in the home folder
  // POSIX || Win32 (cf http://stackoverflow.com/a/41814643/3324977)
  const homePath = process.env.HOME || process.env.USERPROFILE
  cacheFolder = path.join(homePath, '.cache/wikidata-cli')
  fs.writeAccessSync(cacheFolder)
}

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
