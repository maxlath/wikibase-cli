const fs = require('fs')
const configFolder = require('../get_folder_path')('local', 'config')
const configPath = configFolder + '/config.json'

try {
  fs.accessSync(configPath)
} catch (err) {
  // Initialize if it doesn't exist
  fs.writeFileSync(configPath, '{}')
}

module.exports = configPath
