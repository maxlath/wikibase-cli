const prompt = require('./prompt')
const { green, red } = require('chalk')
const wbToken = require('wikibase-token')
const configOps = require('../config/file_operations')

module.exports = instance => {
  return chooseCredentialsType(instance)
  .catch(cleanExitOnPromptCancelation)
}

const chooseCredentialsType = instance => {
  return prompt([
    {
      key: 'type',
      label: `Which authentification mecanism would you like to use to login to ${instance}?`,
      info: 'Beware that those will be stored in plain text on your computer',
      options: [ 'username - password', 'OAuth tokens' ]
    }
  ])
  .then(({ type }) => {
    if (type === '1') {
      return requestUsernameAndPassword(instance)
    } else {
      return requestOauthTokens(instance)
    }
  })
  .then(() => console.log(green('ready to work!')))
}

const requestOauthTokens = instance => {
  console.log(`
If you don't have OAuth tokens yet, you can request owner-only tokens OAuth consumers at

${getOAuthConsumerRegistrationUrl(instance)}

Select "Request authorization for specific permissions" and adjust to your needs.
Required authorizations:
- Edit existing pages
Recommanded authorizations:
- Create, edit, and move pages
`)

  return prompt([
    { key: 'consumer_key', label: 'Consumer token', pattern: patterns.key },
    { key: 'consumer_secret', label: 'Consumer secret', pattern: patterns.secret },
    { key: 'token', label: 'Access token', pattern: patterns.key },
    { key: 'token_secret', label: 'Access secret', pattern: patterns.secret }
  ])
  .then((oauthTokens) => getTokenOrRetry({ instance, oauth: oauthTokens }))
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
  return prompt([
    { key: 'username', pattern: nonEmptyStringPattern },
    { key: 'password', pattern: nonEmptyStringPattern }
  ])
  .then(({ username, password }) => getTokenOrRetry({ instance, username, password }))
}

const nonEmptyStringPattern = /.+/

const getTokenOrRetry = (wbTokenConfig) => {
  const getToken = wbToken(wbTokenConfig)
  return getToken()
  .then(res => {
    if (res.token.length !== 42) throw new Error('invalid credentials')
  })
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
