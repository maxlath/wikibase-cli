const crypto = require('crypto')

module.exports = str => crypto.createHash('md5').update(str).digest('hex')
