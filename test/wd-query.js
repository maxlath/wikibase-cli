const test = require('ava')
const execa = require('execa')

test('wd query: display help', t => {
  return execa.shell('../bin/wd query')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})
