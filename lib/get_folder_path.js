const path = require('path')
const fs = require('./fs')
const mkdirp = require('mkdirp')
const homePath = require('os').homedir()

module.exports = (category, subfolderName) => {
  let folderPath
  if (process.platform === 'win32') {
    folderPath = path.win32.join(homePath, 'wikibase-cli', category || subfolderName)
  } else {
    // For Linux/MacOS systems, globalFolder should follow conventions: .cache, .config, .local, etc
    // cf http://askubuntu.com/a/14536
    folderPath = path.join(homePath, `.${category}`, 'wikibase-cli')
    if (subfolderName) folderPath = path.join(folderPath, subfolderName)
  }
  mkdirp.sync(folderPath)
  // Make sure we have write access right in case the folder already existed
  fs.writeAccessSync(folderPath)

  return folderPath
}
