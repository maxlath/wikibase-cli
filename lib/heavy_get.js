const breq = require('bluereq')
const headers = { 'User-Agent': 'wikidata-cli' }

// Pros:
//  - follows redirects
// Const:
//  - may take some 300ms more to initialize compared to ./ligth_get
//    due to all the dependencies
module.exports = url => breq.get({ url, headers })
