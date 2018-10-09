const fs = require('./fs')
const cacheFolder = require('./get_folder_path')('local/cache', 'cache')

module.exports = subfolder => {
  const subfolderPath = `${cacheFolder}/${subfolder}`
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
