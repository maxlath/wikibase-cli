const path = require('path')
module.exports = process.platform === 'win32' ? path.win32 : path
