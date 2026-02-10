import { yellow } from 'tiny-chalk'
import { debug } from '#lib/debug'
import { initCredentials } from './init_credentials.js'

export default async ({ instance, credentials, batch }) => {
  if (!credentials) return requestCredentials(instance, batch)

  const instanceCredentials = credentials[instance]
  if (!instanceCredentials) return requestCredentials(instance, batch)

  const { oauth, username, password } = instanceCredentials
  if (!(oauth || (username && password))) {
    return requestCredentials(instance, batch)
  }

  debug('credentials', Object.keys(instanceCredentials))
}

const requestCredentials = (instance, batch) => {
  const message = `This operation requires to set your credentials for ${instance}`
  console.log(yellow(message))
  if (batch) {
    console.log(`Unfortunately, those can't be initialized in batch mode (as stdin is busy with batch data).
You can get the initialization menu by running:

  wb config credentials ${instance} test
`)
    process.exit(1)
  } else {
    return initCredentials(instance)
  }
}
