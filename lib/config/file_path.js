const fs = require('fs')
const configFolder = require('../get_folder_path')('local', 'config')

if (configFolder != null) {
  const configPath = configFolder + '/config.json'

  try {
    fs.accessSync(configPath)
  } catch (err) {
    // Initialize if it doesn't exist
    fs.writeFileSync(configPath, '{}')
  }
  module.exports = configPath
} else {
  module.exports = null
}
