const fileOps = require('./file_operations')
const errors_ = require('../errors')
const { yellow, green } = require('chalk')
const validateInstanceCredentials = require('../edit/validate_instance_credentials')

module.exports = async (instance, arg) => {
  const credentials = fileOps.get('credentials') || {}
  const knownInstance = Object.keys(credentials)

  if (!instance) return console.log(JSON.stringify(credentials, null, 2))

  if (!instance.startsWith('http')) errors_.exitMessage(`invalid instance host: ${instance}`)

  const instanceCredentials = credentials[instance]

  if (!instanceCredentials) {
    console.log(yellow(`credentials for instance ${instance} not found`))
    if (knownInstance.length > 0) console.log(`\nKnown instance(s):\n\n${knownInstance.join('\n')}\n`)
    else console.log()
    return require('../edit/init_credentials')(instance)
  }

  if (!arg) return console.log(JSON.stringify(instanceCredentials, null, 2))

  if (arg === 'test') {
    try {
      await validateInstanceCredentials({ instance, credentials: credentials[instance] })
      console.log(green(`${instance} credentials are valid`))
      process.exit(0)
    } catch (err) {
      if (err.statusCode === 400) {
        console.error(err)
        errors_.exitMessage(`${instance} credentials are invalid`)
      } else {
        console.error(err)
      }
    }
  } else if (arg === 'clear' || arg === 'reset') {
    delete credentials[instance]
    fileOps.set('credentials', credentials)
  } else {
    errors_.exitMessage('unknown argument\npossible aruments: clear')
  }
}
