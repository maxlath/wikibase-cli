import { exists, createFolder } from './fs.js'
import getFolderPath from './get_folder_path.js'

export default subfolder => {
  const subfolderPath = getFolderPath('cache', subfolder)
  return exists(subfolderPath)
  .catch(err => {
    if (err.code === 'ENOENT') {
      return createFolder(subfolderPath)
    } else {
      throw err
    }
  })
  .then(() => subfolderPath)
}
