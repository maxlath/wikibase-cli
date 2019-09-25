const { yellow } = require('tiny-chalk')

module.exports = config => {
  const { instance, credentials } = config
  if (!credentials) return requestCredentials(instance)
  const instanceCredentials = credentials[instance]
  if (!(instanceCredentials && instanceCredentials.username && instanceCredentials.password)) {
    return requestCredentials(instance)
  } else {
    return Promise.resolve()
  }
}

const requestCredentials = instance => {
  const message = `This operation requires to set your crendentials for ${instance}`
  console.log(yellow(message))
  return require('./init_credentials')(instance)
}
