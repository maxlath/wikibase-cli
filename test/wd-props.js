const test = require('ava')
const execa = require('execa')

test('wd props --help: display help', t => {
  return execa.shell('../bin/wd props --help')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})
