const test = require('ava')
const execa = require('execa')

test('wd props --help: display help', t => {
  return execa.shell('./bin/wd props --help')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})

test('wd props', t => {
  return execa.shell('./bin/wd props')
  .then(res => {
    t.true(res.stdout.startsWith('{'))
    t.true(res.stdout.split('"P6": "').length === 2)
  })
})

test('wd props --type', t => {
  return execa.shell('./bin/wd props --type -l en')
  .then(res => {
    const data = JSON.parse(res.stdout)
    t.is(data.P6.label, 'head of government')
    t.is(data.P6.type, 'WikibaseItem')
  })
})
