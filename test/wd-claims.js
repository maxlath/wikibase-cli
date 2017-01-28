const test = require('ava')
const execa = require('execa')

test('wd claims: display help', t => {
  return execa.shell('../bin/wd claims')
  .then(res => t.is(res.stdout.split('Usage:').length, 2))
})

test('wd claims <id>', t => {
  return execa.shell('../bin/wd claims Q3521413')
  .then(res => t.is(res.stdout.split('P31 Q11424').length, 2))
})

test('wd claims <id> <property>', t => {
  return execa.shell('../bin/wd claims Q3521413 P31')
  .then(res => t.is(res.stdout, 'Q11424'))
})

test('wd claims returns shell-friendly results when possible', t => {
  return execa.shell('../bin/wd claims Q90 P625')
  .then(res => t.is(res.stdout, '48.856577777778 2.3518277777778'))
})
