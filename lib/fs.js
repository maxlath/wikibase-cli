const fs = require('fs')
const mkdirp = require('mkdirp')

module.exports = {
  writeFile: function (filepath, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filepath, content, (err, res) => {
        err ? reject(err) : resolve(res)
      })
    })
  },
  exists: function (path) {
    return new Promise(function (resolve, reject) {
      fs.access(path, (err, res) => err ? reject(err) : resolve(res))
    })
  },
  createFolder: function (path) {
    return new Promise(function (resolve, reject) {
      mkdirp(path, (err) => err ? reject(err) : resolve())
    })
  },
  writeAccessSync: function (path) {
    // Testing right to write
    // cf https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback
    // Will throw if failing
    fs.accessSync(path, fs.constants.W_OK)
  }
}
