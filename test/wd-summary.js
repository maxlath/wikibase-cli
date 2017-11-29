const test = require('ava')
const execa = require('execa')
const Q123456EnglishSummary = `Label Friedrichshafen
Description Wikimedia disambiguation page
instance of (P31): Wikimedia disambiguation page (Q4167410)`

test('wd summary: display help', t => {
  return execa.shell('./bin/wd summary')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})

test('wd summary <entity>', t => {
  return execa.shell('./bin/wd summary Q123456 -l en')
  .then(res => t.is(res.stdout, Q123456EnglishSummary))
})

test('wd summary <entity> should be tolerant on input', t => {
  return execa.shell('./bin/wd summary -l en azfzafzafazQ123456fazafazfz')
  .then(res => t.is(res.stdout, Q123456EnglishSummary))
})
