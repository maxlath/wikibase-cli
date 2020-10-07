const fetch = require('node-fetch')
// Using a custom agent to set keepAlive=true
// https://nodejs.org/api/http.html#http_class_http_agent
// https://github.com/bitinn/node-fetch#custom-agent
const http = require('http')
const https = require('https')
const httpAgent = new http.Agent({ keepAlive: true })
const httpsAgent = new https.Agent({ keepAlive: true })
const agent = ({ protocol }) => protocol === 'http:' ? httpAgent : httpsAgent

const globalHeaders = require('./request_headers')
const buildHeaders = customHeaders => {
  if (customHeaders) return Object.assign({}, globalHeaders, customHeaders)
  else return globalHeaders
}

module.exports = {
  get: url => {
    return fetch(url, { headers: globalHeaders, agent })
    .then(rejectErrors)
  },

  customGet: ({ url, headers }) => {
    return fetch(url, { headers, agent })
    .then(rejectErrors)
  },

  post: ({ url, body, headers }) => {
    return fetch(url, { method: 'post', body, headers: buildHeaders(headers), agent })
    .then(rejectErrors)
  }
}

const rejectErrors = async res => {
  let body = await res.text()
  // When Wikibase crash it doesn't return JSON errors anymore
  if (body[0] === '{') body = JSON.parse(body)
  const { status: statusCode } = res
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
  if (typeof body === 'string') {
    statusMessage = body
  } else {
    statusMessage = statusMessage || body.message || statusCode
  }
  const err = new Error(statusMessage)
  err.statusMessage = statusMessage
  err.status = err.statusCode = statusCode
  err.body = body
  return err
}

const statusCodeByErrorCode = {
  'no-such-entity': 404
}
