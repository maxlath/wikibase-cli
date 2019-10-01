const { yellow } = require('chalk')

module.exports = config => {
  const { instance, credentials } = config
  if (!credentials) return requestCredentials(instance)
  const instanceCredentials = credentials[instance]
  if (!instanceCredentials) return requestCredentials(instance)
  const { oauth, username, password } = instanceCredentials
  if (oauth || (username && password)) return Promise.resolve()
  else return requestCredentials(instance)
}

const requestCredentials = instance => {
  const message = `This operation requires to set your crendentials for ${instance}`
  console.log(yellow(message))
  return require('./init_credentials')(instance)
}
