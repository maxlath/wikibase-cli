const test = require('ava')
const execa = require('execa')

test('wd coord: display help', t => {
  return execa.shell('./bin/wd claims')
  .then(res => t.is(res.stdout.split('Usage:').length, 2))
})

test('wd coord <id>', t => {
  return execa.shell('./bin/wd coord Q90')
  .then(res => t.is(res.stdout, '48.856577777778 2.3518277777778'))
})
