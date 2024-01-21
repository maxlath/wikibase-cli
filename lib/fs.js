import { accessSync, constants } from 'node:fs'
import { access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

export const exists = path => access(path)

export const assertWriteAccessSync = path => {
  // Testing right to write
  // cf https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback
  // Will throw if failing
  accessSync(path, constants.W_OK)
}

export function getDirname (fileUrl) {
  return fileURLToPath(new URL('.', fileUrl))
}
