const fetch = require('node-fetch')
const globalHeaders = require('./request_headers')
const buildHeaders = customHeaders => Object.assign({}, globalHeaders, customHeaders)

module.exports = {
  get: ({ url, headers }) => {
    return fetch(url, { headers: buildHeaders(headers) })
  },

  post: ({ url, body, headers }) => {
    return fetch(url, { method: 'post', body, headers: buildHeaders(headers) })
  }
}
