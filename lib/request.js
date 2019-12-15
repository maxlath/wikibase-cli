const fetch = require('node-fetch')
const globalHeaders = require('./request_headers')
const buildHeaders = customHeaders => {
  if (customHeaders) return Object.assign({}, globalHeaders, customHeaders)
  else return globalHeaders
}

module.exports = {
  get: url => {
    return fetch(url, { headers: globalHeaders })
    .then(rejectErrors)
  },

  customGet: ({ url, headers }) => {
    return fetch(url, { headers })
    .then(rejectErrors)
  },

  post: ({ url, body, headers }) => {
    return fetch(url, { method: 'post', body, headers: buildHeaders(headers) })
    .then(rejectErrors)
  }
}

const rejectErrors = async res => {
  const body = await res.json()
  let { status: statusCode } = res
  if (statusCode >= 400) {
    throw newError(statusCode, body)
  } else if (body.error) {
    const { info, code } = body.error
    const statusCode = statusCodeByErrorCode[code] || 400
    throw newError(statusCode, info, body)
  } else {
    return body
  }
}

const newError = (statusCode, body, statusMessage) => {
  statusMessage = statusMessage || body.message || statusCode
  const err = new Error(statusMessage)
  err.statusMessage = statusMessage
  err.status = err.statusCode = statusCode
  err.body = body
  return err
}

const statusCodeByErrorCode = {
  'no-such-entity': 404
}
