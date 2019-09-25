const { parse: parseUrl } = require('url')
const headers = require('./request_headers')

/**
 * A super light JSON get promise adapted from
 * https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
 * Requires ~ 1ms to load instead of the bluereq ~320ms or request-promise ~340ms
 */
module.exports = function lightGet (url) {
  // Return new pending promise
  const promise = new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const { get } = url.startsWith('https') ? require('https') : require('http')
    // We need to parse the url as the 'get' function can't take both a url and an options object
    // before Node v10
    const { hostname, port, path } = parseUrl(url)
    const req = get({ hostname, port, path, headers }, onResponse(resolve, reject))
    // handle connection errors of the request
    req.on('error', reject)
  })

  return promise
}

const onResponse = (resolve, reject) => res => {
  // temporary data holder
  const body = []
  // on every content chunk, push it to the data array
  res.on('data', body.push.bind(body))
  // we are done, resolve promise with those joined chunks
  res.on('end', end(res, resolve, reject, body))
}

const end = (res, resolve, reject, body) => () => {
  const bodyStr = body.join('')
  const { statusCode, statusMessage } = res
  const { 'content-type': contentType } = res.headers

  if (statusCode < 400) {
    try {
      if (contentType.startsWith('application/json')) {
        const body = JSON.parse(bodyStr)
        handleJsonResponse(body, resolve, reject)
      } else {
        resolve(bodyStr)
      }
    } catch (err) {
      err.context = { body: bodyStr }
      reject(err)
    }
  } else {
    reject(newError(statusCode, statusMessage, bodyStr))
  }
}

const handleJsonResponse = (body, resolve, reject) => {
  if (body.error) {
    const { info, code } = body.error
    const statusCode = statusCodeByErrorCode[code] || 400
    reject(newError(statusCode, info, body))
  } else {
    resolve(body)
  }
}

const newError = (statusCode, statusMessage, body) => {
  const err = new Error(statusCode + ' ' + statusMessage)
  err.statusMessage = statusMessage
  err.statusCode = statusCode
  err.body = body
  return err
}

const statusCodeByErrorCode = {
  'no-such-entity': 404
}
