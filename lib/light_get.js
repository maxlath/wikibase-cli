/**
 * A super light JSON get promise adapted from
 * https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
 * Requires ~ 1ms to load instead of the bluereq ~320ms or request-promise ~340ms
 */
module.exports = function lightGet (url) {
  // return new pending promise
  const promise = new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const { get } = url.startsWith('https') ? require('https') : require('http')
    const request = get(url, onResponse(resolve, reject))
    // handle connection errors of the request
    request.on('error', reject)
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

  if (statusCode < 400) return resolve(JSON.parse(bodyStr))

  const err = new Error(statusCode + ' ' + statusMessage)
  err.statusMessage = statusMessage
  err.statusCode = statusCode
  err.body = bodyStr
  reject(err)
}
