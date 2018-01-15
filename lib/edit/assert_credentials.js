const { yellow } = require('chalk')

module.exports = config => {
  const instance = config.instance || 'wikidata.org'
  if (!(config.username && config.password)) {
    const message = `This operation requires to set your ${instance} crendentials`
    console.log(yellow(message))
    return require('./init_credentials')(config.instance)
  } else {
    return Promise.resolve()
  }
}
