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

test('wd data should accept several ids', t => {
  return execa.shell('./bin/wd data Q123456 Q123')
  .then(res => {
    t.true(res.stdout.startsWith('['))
    const entities = JSON.parse(res.stdout)
    const dataAttrs = Object.keys(entities[0])
    t.deepEqual(attributes.length, dataAttrs.length)
    dataAttrs.forEach((attr) => t.true(attributes.indexOf(attr) > -1))
  })
})

test('wd data should output entities as ndjson', t => {
  return execa.shell('./bin/wd data Q123456 Q1512522')
  .then(res => {
    t.is(res.stdout.split('\n').length, 4)
  })
})

test('wd data should simplify entity when requested', t => {
  return execa.shell('./bin/wd data Q1512522 --simplify')
  .then(res => {
    const entity = JSON.parse(res.stdout)
    t.is(typeof entity.labels.de, 'string')
    t.is(typeof entity.descriptions.de, 'string')
    t.is(typeof entity.aliases.de[0], 'string')
    t.is(typeof entity.claims.P31[0], 'string')
    t.is(typeof entity.sitelinks.dewiki, 'string')
  })
})

test('wd data should simplify entities when requested', t => {
  return execa.shell('./bin/wd data Q1512522 Q123456 --simplify')
  .then(res => {
    const entity = JSON.parse(res.stdout)[0]
    t.is(typeof entity.labels.de, 'string')
    t.is(typeof entity.descriptions.de, 'string')
    t.is(typeof entity.aliases.de[0], 'string')
    t.is(typeof entity.claims.P31[0], 'string')
    t.is(typeof entity.sitelinks.dewiki, 'string')
  })
})
