const test = require('ava')
const execa = require('execa')

test('wd open: display help', t => {
  return execa.shell('../bin/wd open')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})
