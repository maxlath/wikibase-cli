const test = require('ava')
const execa = require('execa')

test('wd: display help', t => {
  return execa.shell('./bin/wd')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})

test('wd unknown command: log error and display help', t => {
  return execa.shell('./bin/wd nop')
  .then(res => {
    t.is(res.stderr, 'unknown command')
    t.deepEqual(res.stdout.split('Usage:').length, 2)
  })
})
