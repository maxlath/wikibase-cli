const breq = require('bluereq')
const headers = require('./request_headers')

// Pros:
//  - follows redirects
// Const:
//  - may take some 300ms more to initialize compared to ./ligth_get
//    due to all the dependencies
module.exports = {
  get: url => breq.get({ url, headers }),
  post: (url, body) => breq.post({ url, body, headers })
}
