const fs = require('fs')

module.exports = function writeFileAsync (filepath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, content, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}
