const { yellow } = require('chalk')

module.exports = config => {
  const instance = config.instance || 'wikidata.org'
  const { credentials } = config
  if (!(credentials && credentials.username && credentials.password)) {
    const message = `This operation requires to set your crendentials for ${instance}`
    console.log(yellow(message))
    return require('./init_credentials')(config.instance)
  } else {
    return Promise.resolve()
  }
}
