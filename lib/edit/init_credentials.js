const prompt = require('./prompt')
const { green, red, bold } = require('tiny-chalk')
const { values } = require('lodash')
const wbToken = require('wikibase-token')
const configOps = require('../config/file_operations')

module.exports = instance => {
  return chooseCredentialsType(instance)
  .catch(cleanExitOnPromptCancelation)
}

const chooseCredentialsType = instance => {
  console.log(`Would you like to use OAuth tokens or your username/password to login to ${instance}?`)
  return prompt({ type: 'Enter "o" for OAuth, any key for username/password' })
  .then(({ type }) => {
    if (type && type.trim()[0].toLowerCase() === 'o') {
      return requestOauthTokens(instance)
    } else {
      return requestUsernameAndPassword(instance)
    }
  })
  .then(() => console.log(green('ready to work!')))
}

const requestOauthTokens = instance => {
  console.log(`
If you don't have OAuth tokens yet, you can request owner-only tokens OAuth consumers at ${getOAuthConsumerRegistrationUrl(instance)}

Select "Request authorization for specific permissions" and adjust to your needs:

Required authorizations:
- Edit existing pages
Recommanded authorizations:
- Create, edit, and move pages
`)

  return prompt({
    'consumer_key': 'Consumer token',
    'consumer_secret': 'Consumer secret',
    'token': 'Access token',
    'token_secret': 'Access secret'
  })
  .then((oauthTokens) => getTokenOrRetry({ instance, oauth: oauthTokens }))
}

const oauthConsumerRegistrationPathname = '/wiki/Special:OAuthConsumerRegistration/propose?wpownerOnly=1'
const getOAuthConsumerRegistrationUrl = instance => {
  if (instance.endsWith('wikidata.org')) return `https://meta.wikimedia.org${oauthConsumerRegistrationPathname}`
  else return `${instance}${oauthConsumerRegistrationPathname}`
}

const saveOAuthTokens = instance => {}

const requestUsernameAndPassword = instance => {
  return prompt({
    username: 'username',
    password: 'password'
  })
  .then(({ username, password }) => getTokenOrRetry({ instance, username, password }))
}

const getTokenOrRetry = (wbTokenConfig) => {
  const getToken = wbToken(wbTokenConfig)
  return getToken()
  .then(() => saveSuccessfulCredentials(wbTokenConfig))
  .catch(err => {
    const loginError = err.body && err.body.login && err.body.login.reason
    if (loginError) {
      console.error(red(loginError))
    } else {
      console.error(red(err.message))
    }
    // Retry
    return chooseCredentialsType(wbTokenConfig.instance)
  })
}

const saveSuccessfulCredentials = (wbTokenConfig) => {
  const { instance, oauth, username, password } = wbTokenConfig
  const credentials = configOps.get('credentials') || {}
  if (oauth) credentials[instance] = { oauth }
  else credentials[instance] = { username, password }
  configOps.set('credentials', credentials)
}

const cleanExitOnPromptCancelation = err => {
  if (err.message === 'canceled') process.exit(1)
  else throw err
}
