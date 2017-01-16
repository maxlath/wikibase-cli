const test = require('ava')
const execa = require('execa')

test('wd id: display help', t => {
  return execa.shell('../bin/wd id')
  .then(res => t.is(res.stdout.split('Usage:').length, 2))
})

test('wd id <title>', t => {
  return execa.shell('../bin/wd id Cantabria -l en')
  .then(res => t.is(res.stdout, 'Q3946'))
})

test('wd id <title>', t => {
  return execa.shell('../bin/wd id https://fr.wikipedia.org/wiki/The_Ister')
  .then(res => t.is(res.stdout, 'Q3521413'))
})
