import { access } from 'node:fs/promises'
import { mkdirp } from 'mkdirp'
import getFolderPath from './get_folder_path.js'

export async function getCacheFolderPath (subfolder) {
  const subfolderPath = getFolderPath('cache', subfolder)
  try {
    await access(subfolderPath)
    return subfolderPath
  } catch (err) {
    if (err.code === 'ENOENT') {
      await mkdirp(subfolderPath)
      return subfolderPath
    } else {
      throw err
    }
  }
}
