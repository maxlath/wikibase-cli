const path = require('path')
const fs = require('./fs')
const mkdirp = require('mkdirp')

module.exports = (folderName, globalFolder) => {
  var folderPath = path.resolve(__dirname, `../${folderName}`)

  try {
    // Make sure the folder was created
    mkdirp.sync(folderPath)
    // Which should be enough to check that we have access right,
    // unless the folder was already existing but we don't have access right
    // Known case: when folderName is set to ''
    // In that case, also make sure we have write access right
    fs.writeAccessSync(folderPath)
  } catch (err) {
    if (err.code !== 'EACCES') throw err
    // If writing fails because we don't have the access rights
    // try writting in the home folder
    // POSIX || Win32 (cf http://stackoverflow.com/a/41814643/3324977)
    const homePath = process.env.HOME || process.env.USERPROFILE
    if (!homePath) {
      console.warn('unable to find a $HOME directory to persist the config')
      return
    }
    // globalFolder should follow conventions: .cache, .config, .local, etc
    // cf http://askubuntu.com/a/14536
    folderPath = path.join(homePath, `.${globalFolder}/wikibase-cli`)
    // Same sequence as above
    mkdirp.sync(folderPath)
    fs.writeAccessSync(folderPath)
  }

  return folderPath
}
