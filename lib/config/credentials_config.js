const fileOps = require('./file_operations')
const errors_ = require('../errors')
const { yellow } = require('chalk')

module.exports = (instance, arg) => {
  const credentials = fileOps.get('credentials') || {}
  const knownInstance = Object.keys(credentials)

  if (!instance) return console.log(JSON.stringify(credentials, null, 2))

  if (!instance.startsWith('http')) errors_.exitMessage('invalid instance host')

  const instanceCredentials = credentials[instance]

  if (!instanceCredentials) {
    console.log(yellow(`credentials for instance ${instance} not found`))
    if (knownInstance.length > 0) console.log(`\nKnown instance(s):\n\n${knownInstance.join('\n')}\n`)
    else console.log()
    return require('../edit/init_credentials')(instance)
  }

  if (!arg) return console.log(JSON.stringify(instanceCredentials, null, 2))

  if (arg === 'clear' || arg === 'reset') {
    delete credentials[instance]
    fileOps.set('credentials', credentials)
  } else {
    errors_.exitMessage('unknown argument\npossible aruments: clear')
  }
}
