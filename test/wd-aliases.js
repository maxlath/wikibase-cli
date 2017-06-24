const test = require('ava')
const execa = require('execa')

test('wd aliases: display help', t => {
  return execa.shell('./bin/wd aliases')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})

test('wd aliases <entity>', t => {
  return execa.shell('./bin/wd aliases Q123')
  .then(res => t.true(res.stdout.split('Sept').length > 1))
})

test('wd aliases <entity> should be tolerant on input', t => {
  return execa.shell('./bin/wd aliases azfzafzafazQ123fazafazfz')
  .then(res => t.true(res.stdout.split('Sept').length > 1))
})
