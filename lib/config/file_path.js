const fs = require('fs')
const path = require('../path')
const configFolder = require('../get_folder_path')('config')

if (configFolder != null) {
  const configPath = path.join(configFolder, 'config.json')

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
