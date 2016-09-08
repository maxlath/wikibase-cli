const test = require('ava')
const execa = require('execa')

test('wd label: display help', t => {
  return execa.shell('../bin/wd label')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})

test('wd label <entity>', t => {
  return execa.shell('../bin/wd label Q123456')
  .then(res => t.deepEqual(res.stdout, 'Friedrichshafen'))
})
