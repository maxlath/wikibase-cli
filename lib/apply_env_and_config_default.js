const config = require('./config/config')
const fallbackConfigOptions = [ 'clipboard', 'json', 'verbose', 'instance', 'sparql-endpoint' ]
const { camelCase, snakeCase } = require('lodash')

module.exports = program => {
  program.lang = program.lang || config.lang || require('./local_lang')
  fallbackConfigOptions.forEach(fallbackToConfigOption(program))
}

const fallbackToConfigOption = program => parameter => {
  const key = camelCase(parameter)
  if (program[key] != null) return

  program[key] = getEnvVariable(parameter)
  if (program[key] != null) return

  program[key] = config[parameter]
}

const getEnvVariable = parameter => {
  const key = `WD_${snakeCase(parameter).toUpperCase()}`
  const value = process.env[key]
  if (value == null || value === '') return
  if (value === 'true') return true
  if (value === 'false') return false
  return value
}
