const test = require('ava')
const execa = require('execa')
const Q4167410EnglishSummary = 'Label Friedrichshafen\nDescription Wikipedia disambiguation page\nP31 Q4167410'

test('wd summary: display help', t => {
  return execa.shell('./bin/wd summary')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})

test('wd summary <entity>', t => {
  return execa.shell('./bin/wd summary Q123456 -l en')
  .then(res => t.is(res.stdout, Q4167410EnglishSummary))
})

test('wd summary <entity> should be tolerant on input', t => {
  return execa.shell('./bin/wd summary -l en azfzafzafazQ123456fazafazfz')
  .then(res => t.is(res.stdout, Q4167410EnglishSummary))
})
