const { yellow } = require('chalk')

module.exports = config => {
  if (!(config.username && config.password)) {
    console.log(yellow('This operation requires to set your Wikidata crendentials'))
    return require('./init_credentials')()
  } else {
    return Promise.resolve()
  }
}
