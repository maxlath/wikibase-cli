const config = require('./config/config')
const fallbackConfigOptions = [ 'clipboard', 'json', 'verbose', 'instance', 'sparql-endpoint' ]
const { camelCase } = require('lodash')

module.exports = program => {
  program.lang = program.lang || config.lang || require('./local_lang')
  fallbackConfigOptions.forEach(fallbackToConfigOption(program))
}

const fallbackToConfigOption = program => parameter => {
  if (program[parameter] == null) {
    program[camelCase(parameter)] = config[parameter]
  }
}
