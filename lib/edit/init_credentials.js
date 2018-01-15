const prompt = require('prompt')
const { red } = require('chalk')
// wikidata-token is installed as a dependecy of wikidata-edit
const wdToken = require('wikidata-token')
const configOps = require('../config/file_operations')
const usernameKey = 'Wikidata username'
const passwordKey = 'Wikidata password'
const keys = [ usernameKey, passwordKey ]

module.exports = instance => {
  return requestUsernameAndPassword(instance)
  .then(saveLocalConfig)
}

const requestUsernameAndPassword = instance => {
  return new Promise((resolve, reject) => {
    prompt.start()
    prompt.get(keys, parsePromptResults(resolve, reject, instance))
  })
}

const parsePromptResults = (resolve, reject, instance) => (err, res) => {
  if (err) return reject(err)
  const username = res[usernameKey]
  const password = res[passwordKey]
  resolve(getTokenOrRetry(instance, username, password))
}

const getTokenOrRetry = (wikibaseInstance, username, password) => {
  const getToken = wdToken({ wikibaseInstance, username, password })
  return getToken()
  .then(() => [ username, password ])
  .catch(err => {
    const loginError = err.body.login && err.body.login.reason
    if (loginError) {
      console.error(red(loginError))
    } else {
      console.error(err)
    }
    // Retry
    return requestUsernameAndPassword(wikibaseInstance)
  })
}

const saveLocalConfig = ([ username, password ]) => {
  configOps.set('username', username)
  configOps.set('password', password)
}
