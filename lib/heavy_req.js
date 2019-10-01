const breq = require('bluereq')
const globalHeaders = require('./request_headers')
const buildHeaders = customHeaders => Object.assign({}, globalHeaders, customHeaders)

// Pros:
//  - follows redirects
// Const:
//  - may take some 300ms more to initialize compared to ./ligth_get
//    due to all the dependencies
module.exports = {
  get: ({ url, headers }) => breq.get({ url, headers: buildHeaders(headers) }),
  post: ({ url, body, headers }) => breq.post({ url, body, headers: buildHeaders(headers) })
}
