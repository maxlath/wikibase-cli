const fs = require('fs')
const path = require('path')

const getKeyFromFilename = filename => {
  return filename
  .replace(/_/g, '-')
  .replace('.js', '')
}

const list = fs.readdirSync(path.join(__dirname, '/queries')).map(getKeyFromFilename)

const getAbsolutePath = key => {
  return process.cwd() + '/lib/queries/' + key.replace(/-/g, '_') + '.js'
}

module.exports = { list, getAbsolutePath }
