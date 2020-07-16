const fs = require('./fs')
const getFolderPath = require('./get_folder_path')

module.exports = subfolder => {
  const subfolderPath = getFolderPath('cache', subfolder)
  return fs.exists(subfolderPath)
  .catch(err => {
    if (err.code === 'ENOENT') {
      return fs.createFolder(subfolderPath)
    } else {
      throw err
    }
  })
  .then(() => subfolderPath)
}
