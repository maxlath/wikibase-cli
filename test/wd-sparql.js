const test = require('ava')
const execa = require('execa')

test('wd sparql: display help', t => {
  return execa.shell('../bin/wd sparql')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})

test('wd sparql <file>', t => {
  return execa.shell('../bin/wd sparql ./assets/query.rq')
  .then(res => {
    t.true(res.stdout[0] === '[')
    t.deepEqual(res.stdout.split('"Q47304"').length, 2)
  })
})
