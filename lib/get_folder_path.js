const path = require('path')
const fs = require('./fs')

module.exports = function (folderName, globalFolder) {
  var folderPath = path.resolve(__dirname, `../${folderName}`)

  try {
    fs.writeAccessSync(folderPath)
  } catch (err) {
    if (err.code !== 'EACCES') throw err
    // If writing fails because we don't have the access rights
    // try writting in the home folder
    // POSIX || Win32 (cf http://stackoverflow.com/a/41814643/3324977)
    const homePath = process.env.HOME || process.env.USERPROFILE
    // globalFolder should follow conventions: .cache, .config, .local, etc
    // cf http://askubuntu.com/a/14536
    folderPath = path.join(homePath, `.${globalFolder}/wikidata-cli`)
    fs.writeAccessSync(folderPath)
  }

  return folderPath
}
