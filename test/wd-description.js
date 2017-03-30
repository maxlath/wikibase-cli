const test = require('ava')
const execa = require('execa')

test('wd description: display help', t => {
  return execa.shell('./bin/wd description')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})

test('wd description <entity>', t => {
  return execa.shell('./bin/wd description Q123456 -l en')
  .then(res => t.is(res.stdout, 'Wikipedia disambiguation page'))
})

test('wd description <entity> should be tolerant on input', t => {
  return execa.shell('./bin/wd description  -l en azfzafzafazQ123456fazafazfz')
  .then(res => t.is(res.stdout, 'Wikipedia disambiguation page'))
})
