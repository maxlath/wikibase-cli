const test = require('ava')
const execa = require('execa')

const attributes = [ 'pageid', 'ns', 'title', 'lastrevid', 'modified', 'type', 'id', 'labels', 'descriptions', 'aliases', 'claims', 'sitelinks' ]

test('wd data: display help', t => {
  return execa.shell('./bin/wd data')
  .then(res => t.deepEqual(res.stdout.split('Usage:').length, 2))
})

test('wd data <entity>', t => {
  return execa.shell('./bin/wd data Q123456')
  .then(res => {
    t.true(res.stdout.startsWith('{'))
    const data = JSON.parse(res.stdout)
    const dataAttrs = Object.keys(data)
    t.deepEqual(attributes.length, dataAttrs.length)
    dataAttrs.forEach((attr) => t.true(attributes.indexOf(attr) > -1))
  })
})
