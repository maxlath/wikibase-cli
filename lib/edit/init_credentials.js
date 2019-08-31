const prompt = require('prompt')
const { red } = require('chalk')
const { values } = require('lodash')
const wdToken = require('wikibase-token')
const configOps = require('../config/file_operations')

module.exports = instance => {
  return requestUsernameAndPassword(instance)
  .then(saveLocalConfig)
}

const requestUsernameAndPassword = instance => {
  const keys = {
    usernameKey: `${instance} username`,
    passwordKey: `${instance} password`
  }
  return new Promise((resolve, reject) => {
    prompt.start()
    prompt.get(values(keys), parsePromptResults(resolve, reject, instance, keys))
  })
}

const parsePromptResults = (resolve, reject, instance, keys) => (err, res) => {
  if (err) return reject(err)
  const username = res[keys.usernameKey]
  const password = res[keys.passwordKey]
  resolve(getTokenOrRetry(instance, username, password))
}

const getTokenOrRetry = (instance, username, password) => {
  const getToken = wdToken({ instance, username, password })
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
    return requestUsernameAndPassword(instance)
  })
}

const saveLocalConfig = ([ username, password ]) => {
  configOps.set('username', username)
  configOps.set('password', password)
}
