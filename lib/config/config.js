const isEnvTest = process.env.NODE_ENV === 'tests'
if (isEnvTest) {
// Neutralize the local config for tests
  module.exports = {}
} else {
  const filePath = require('./file_path')
  // Fallback to an empty config if no config path could be determined
  module.exports = filePath ? require(filePath) : {}
}
