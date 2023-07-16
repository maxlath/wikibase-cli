import { yellow, green } from '#lib/chalk'
import { initCredentials } from '#lib/edit/init_credentials'
import validateInstanceCredentials from '../edit/validate_instance_credentials.js'
import errors_ from '../errors.js'
import fileOps from './file_operations.js'

export async function configurateCredentials (instance, arg) {
  const credentials = fileOps.get('credentials') || {}
  const knownInstance = Object.keys(credentials)

  if (!instance) return console.log(JSON.stringify(credentials, null, 2))

  if (!instance.startsWith('http')) errors_.exitMessage(`invalid instance host: ${instance}`)

  const instanceCredentials = credentials[instance]

  if (!instanceCredentials) {
    console.log(yellow(`credentials for instance ${instance} not found`))
    if (knownInstance.length > 0) console.log(`\nKnown instance(s):\n\n${knownInstance.join('\n')}\n`)
    else console.log()
    return initCredentials(instance)
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
