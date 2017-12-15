const prompt = require('prompt')
const { red } = require('chalk')
const wdToken = require('wikidata-token')
const configOps = require('../config/file_operations')
const usernameKey = 'Wikidata username'
const passwordKey = 'Wikidata password'

const saveLocalConfig = ([ username, password ]) => {
  configOps.set('username', username)
  configOps.set('password', password)
}

const requestUsernameAndPassword = () => {
  return new Promise((resolve, reject) => {
    prompt.start()
    prompt.get([usernameKey, passwordKey], parsePromptResults(resolve, reject))
  })
}

const parsePromptResults = (resolve, reject) => (err, res) => {
  if (err) return reject(err)
  const username = res[usernameKey]
  const password = res[passwordKey]
  resolve(getTokenOrRetry(username, password))
}

const getTokenOrRetry = (username, password) => {
  const getToken = wdToken({ username, password })
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
    return requestUsernameAndPassword()
  })
}

module.exports = () => {
  return requestUsernameAndPassword()
  .then(saveLocalConfig)
}
