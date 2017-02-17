const isEnvTest = process.env.NODE_ENV === 'tests' || process.env.AVA_PATH
// Neutralize the local config for tests
module.exports = isEnvTest ? {} : require(require('./config_file_path'))
