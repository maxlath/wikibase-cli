const fs = require('fs')
const path = require('path')

const getKeyFromFilename = filename => {
  return filename
  .replace(/_/g, '-')
  .replace('.js', '')
}

const list = fs.readdirSync(path.join(__dirname, '/queries')).map(getKeyFromFilename)

const getAbsolutePath = key => {
  const filename = key.replace(/-/g, '_') + '.js'
  return path.join(__dirname, 'queries/' + filename)
}

module.exports = { list, getAbsolutePath }
