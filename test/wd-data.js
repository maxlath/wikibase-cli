const should = require('should')
const execa = require('execa')
const _ = require('lodash')

const attributes = [ 'pageid', 'ns', 'title', 'lastrevid', 'modified', 'type', 'id', 'labels', 'descriptions', 'aliases', 'claims', 'sitelinks' ]

describe('wd data', function () {
  this.timeout(20000)

  // This test fails when run from a script as process.stdin.isTTY is undefined
  // and the script thus will listen for stdin. But it works when run manually,
  // and no other way to detect a stdin input was found

  // it('should display help', done => {
  //   execa.shell('./bin/wd data')
  //   .then(res => {
  //     res.stdout.split('Usage:').length.should.equal(2)
  //     done()
  //   })
  //   .catch(done)
  // })

  it('<entity>', done => {
    execa.shell('./bin/wd data Q123456')
    .then(res => {
      res.stdout.startsWith('{').should.be.true()
      const data = JSON.parse(res.stdout)
      const dataAttrs = Object.keys(data)
      attributes.length.should.equal(dataAttrs.length)
      dataAttrs.forEach(attr => should(attributes.indexOf(attr) > -1).be.true())
      done()
    })
    .catch(done)
  })

  it('should accept several ids', done => {
    execa.shell('./bin/wd data Q123456 Q123')
    .then(res => {
      const lines = res.stdout.split('\n')
      lines.length.should.equal(2)
      lines.forEach(line => {
        Object.keys(JSON.parse(line)).forEach(attr => {
          should(attributes.includes(attr)).be.true()
        })
      })
      done()
    })
    .catch(done)
  })

  it('should output entities as ndjson', done => {
    execa.shell('./bin/wd data Q123456 Q1512522')
    .then(res => {
      res.stdout.split('\n').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('should simplify entity when requested', done => {
    execa.shell('./bin/wd data Q1512522 --simplify')
    .then(res => {
      const entity = JSON.parse(res.stdout)
      entity.labels.de.should.be.a.String()
      entity.descriptions.de.should.be.a.String()
      entity.aliases.de[0].should.be.a.String()
      entity.claims.P31[0].should.be.a.String()
      entity.sitelinks.dewiki.should.be.a.String()
      done()
    })
    .catch(done)
  })

  it('should simplify entities when requested', done => {
    execa.shell('./bin/wd data Q1512522 Q123456 --simplify')
    .then(res => {
      const entity = JSON.parse(res.stdout.split('\n')[0])
      entity.labels.de.should.be.a.String()
      entity.descriptions.de.should.be.a.String()
      entity.aliases.de[0].should.be.a.String()
      entity.claims.P31[0].should.be.a.String()
      entity.sitelinks.dewiki.should.be.a.String()
      done()
    })
    .catch(done)
  })

  it('should return only the desired props when requested', done => {
    execa.shell('./bin/wd data Q1512522 --props labels,aliases')
    .then(res => {
      const entity = JSON.parse(res.stdout)
      should(entity.labels).be.an.Object()
      should(entity.descriptions).not.be.ok()
      should(entity.aliases).be.an.Object()
      should(entity.descriptions).not.be.ok()
      should(entity.sitelinks).not.be.ok()
      done()
    })
    .catch(done)
  })

  it('should accept ids on stdin', done => {
    execa.shell('echo "Q123456 Q123" | ./bin/wd data --props labels --simplify')
    .then(res => {
      const lines = res.stdout.split('\n')
      lines.length.should.equal(2)
      const entities = lines.map(JSON.parse.bind(JSON))
      entities[0].id.should.equal('Q123456')
      entities[1].id.should.equal('Q123')
      entities.forEach(entity => {
        should(entity.labels).be.an.Object()
        _.values(entity.labels).forEach(label => {
          label.should.be.a.String()
        })
        should(entity.descriptions).not.be.ok()
        should(entity.aliases).not.be.ok()
        should(entity.descriptions).not.be.ok()
        should(entity.sitelinks).not.be.ok()
      })
      done()
    })
    .catch(done)
  })

  it('should return ttl when requested', done => {
    execa.shell('./bin/wd data Q1512522 --format ttl')
    .then(res => {
      res.stdout.should.startWith('@prefix rdf:')
      done()
    })
    .catch(done)
  })
})
