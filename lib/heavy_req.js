const breq = require('bluereq')
const { name, version } = require('../package.json')
const headers = { 'User-Agent': `${name}/v${version}` }

// Pros:
//  - follows redirects
// Const:
//  - may take some 300ms more to initialize compared to ./ligth_get
//    due to all the dependencies
module.exports = {
  get: url => breq.get({ url, headers }),
  post: (url, body) => breq.post({ url, body, headers })
}
