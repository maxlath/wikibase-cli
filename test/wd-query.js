const test = require('ava')
const execa = require('execa')

test('wd query: display help', t => {
  return execa.shell('./bin/wd query')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})

test('wd query -p [prop] -o [obj] -t [limit]', t => {
  return execa.shell('./bin/wd query -p P31 -o Q44559 --limit 100')
  .then(res => {
    t.is(res.stdout.split('Q47304').length, 2)
  })
})
