import { homedir } from 'node:os'
import path from 'node:path'
import { mkdirp } from 'mkdirp'
import { assertWriteAccessSync } from './fs.js'

const homePath = homedir()

export default (category, subfolderName) => {
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
  assertWriteAccessSync(folderPath)

  return folderPath
}
