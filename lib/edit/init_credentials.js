const prompt = require('./prompt')
const { green, red } = require('chalk')
const configOps = require('../config/file_operations')
const validateInstanceCredentials = require('./validate_instance_credentials')

module.exports = instance => {
  return chooseCredentialsType(instance)
  .catch(cleanExitOnPromptCancelation)
}

const chooseCredentialsType = async instance => {
  const { type } = await prompt([
    {
      key: 'type',
      label: `Which authentication mechanism would you like to use to login to ${instance} ?`,
      info: '/!\\ Beware that those will be stored in plain text on your computer',
      options: [ 'username - password', 'OAuth tokens' ]
    }
  ])
  if (type === '1') {
    await requestUsernameAndPassword(instance)
  } else {
    await requestOauthTokens(instance)
  }
  console.log(green('ready to work!'))
}

const requestOauthTokens = async instance => {
  console.log(`
If you don't have OAuth tokens for this instance yet. Assuming that you have sufficiant authorization level, you should be able to create an owner-only OAuth consumers at

${getOAuthConsumerRegistrationUrl(instance)}

Select "Request authorization for specific permissions" and adjust to your needs.
Required authorizations:
- Edit existing pages
Recommended authorizations:
- Create, edit, and move pages

In case you don't have a sufficiant authorization level and thus can't create an owner-only OAuth consumer, the next best thing would be to:
- restart this process
- select '1 - username - password'
- follow the instructions to use a BotPassword
`)

  const oauthTokens = await prompt([
    { key: 'consumer_key', label: 'Consumer token', pattern: patterns.key },
    { key: 'consumer_secret', label: 'Consumer secret', pattern: patterns.secret },
    { key: 'token', label: 'Access token', pattern: patterns.key },
    { key: 'token_secret', label: 'Access secret', pattern: patterns.secret }
  ])
  const credentials = { oauth: oauthTokens }
  return getTokenOrRetry({ instance, credentials })
}

const patterns = {
  key: /^[0-9a-f]{32}$/,
  secret: /^[0-9a-f]{40}$/
}

const prefilledParams = [
  'wpname=wikibase-cli-myusername',
  'wpdescription=tokens%20for%20wikibase-cli%20%28https%3A%2F%2Fgithub.com%2Fmaxlath%2Fwikibase-cli%29',
  'wpownerOnly=1'
].join('&')

const oauthConsumerRegistrationPathname = `/wiki/Special:OAuthConsumerRegistration/propose?${prefilledParams}`
const getOAuthConsumerRegistrationUrl = instance => {
  if (instance.endsWith('wikidata.org')) return `https://meta.wikimedia.org${oauthConsumerRegistrationPathname}`
  else return `${instance}${oauthConsumerRegistrationPathname}`
}

const requestUsernameAndPassword = instance => {
  console.log(`
Note that you can (and probably should) use a BotPassword instead of giving this tool your main password.
This is especially recommended as those credentials will be saved in plain text in your home folder.
  - Request password: ${instance}/wiki/Special:BotPasswords
  - Your username would then stay the same, but the password would look something like password_name@wctpmrc98oy80xpdo9oy6glwqlo8toyo
  - Associated wikibase-edit documentation: https://github.com/maxlath/wikibase-edit/blob/master/docs/how_to.md#using-your-username-and-a-bot-password
  `)
  return prompt([
    { key: 'username', pattern: nonEmptyStringPattern },
    { key: 'password', pattern: nonEmptyStringPattern }
  ])
  .then(({ username, password }) => {
    const credentials = { username, password }
    return getTokenOrRetry({ instance, credentials })
  })
}

const nonEmptyStringPattern = /.+/

const getTokenOrRetry = async ({ instance, credentials }) => {
  try {
    await validateInstanceCredentials({ instance, credentials })
    await saveSuccessfulCredentials({ instance, credentials })
  } catch (err) {
    const loginError = err.body && err.body.login && err.body.login.reason
    if (loginError) {
      console.error(red(loginError))
    } else {
      console.error(red(err.message))
    }
    // Retry
    return chooseCredentialsType(instance)
  }
}

const saveSuccessfulCredentials = async ({ instance, credentials: instanceCreds }) => {
  const { oauth, username, password } = instanceCreds
  const credentials = configOps.get('credentials') || {}
  if (oauth) credentials[instance] = { oauth }
  else credentials[instance] = { username, password }
  await configOps.set('credentials', credentials)
}

const cleanExitOnPromptCancelation = err => {
  if (err.message === 'canceled') process.exit(1)
  else throw err
}
