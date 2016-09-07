const test = require('ava')
const execa = require('execa')

test('wd sparql: display help', t => {
  return execa.shell('../bin/wd sparql')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})
