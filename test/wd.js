const test = require('ava')
const execa = require('execa')

test('wd: display help', t => {
  return execa.shell('./bin/wd')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})
