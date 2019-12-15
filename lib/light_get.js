const fetch = require('node-fetch')
const headers = require('./request_headers')

module.exports = url => {
  return fetch(url, { headers })
  .then(res => res.json())
  .then(rejectBodyErrors)
}

const rejectBodyErrors = body => {
  if (body.error) {
    const { info, code } = body.error
    const statusCode = statusCodeByErrorCode[code] || 400
    throw newError(statusCode, info, body)
  } else {
    return body
  }
}

const newError = (statusCode, statusMessage, body) => {
  const err = new Error(statusCode + ' ' + statusMessage)
  err.statusMessage = statusMessage
  err.status = err.statusCode = statusCode
  err.body = body
  return err
}

const statusCodeByErrorCode = {
  'no-such-entity': 404
}
