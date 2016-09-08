const test = require('ava')
const execa = require('execa')

test('wd wikiqid: display help', t => {
  return execa.shell('../bin/wd wikiqid')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})

test('wd wikiqid <title>', t => {
  return execa.shell('../bin/wd wikiqid Cantabria -l en')
  .then(res => t.true(res.stdout.split('Q3946').length === 2))
})
