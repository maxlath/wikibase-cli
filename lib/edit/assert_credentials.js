const { yellow } = require('chalk')
const initCredentials = require('./init_credentials')

module.exports = async ({ instance, credentials }) => {
  if (!credentials) return requestCredentials(instance)

  const instanceCredentials = credentials[instance]
  if (!instanceCredentials) return requestCredentials(instance)

  const { oauth, username, password } = instanceCredentials
  if (!(oauth || (username && password))) {
    return requestCredentials(instance)
  }
}

const requestCredentials = instance => {
  const message = `This operation requires to set your credentials for ${instance}`
  console.log(yellow(message))
  return initCredentials(instance)
}
