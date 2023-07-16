import fs from 'node:fs'
import mkdirp from 'mkdirp'

export const writeFile = (filepath, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, content, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}
export const exists = path => {
  return new Promise((resolve, reject) => {
    fs.access(path, (err, res) => err ? reject(err) : resolve(res))
  })
}
export const createFolder = path => {
  return new Promise((resolve, reject) => {
    mkdirp(path, err => err ? reject(err) : resolve())
  })
}
export const writeAccessSync = path => {
  // Testing right to write
  // cf https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback
  // Will throw if failing
  fs.accessSync(path, fs.constants.W_OK)
}

export function getDirname (fileUrl) {
  return new URL('.', fileUrl).pathname
}
