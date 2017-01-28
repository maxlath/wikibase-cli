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
  }
}
