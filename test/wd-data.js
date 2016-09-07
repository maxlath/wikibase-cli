const test = require('ava')
const execa = require('execa')

test('wd data: display help', t => {
  return execa.shell('../bin/wd data')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})
