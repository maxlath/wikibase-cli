require('should')
const { shellExec } = require('./lib/utils')

describe('wb props', function () {
  this.timeout(20000)

  it('should display help', done => {
    shellExec('./bin/wd props --help')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('should output properties', done => {
    shellExec('./bin/wd props')
    .then(res => {
      res.stdout.startsWith('{').should.be.true()
      res.stdout.split('"P6": "').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('should output properties with types', done => {
    shellExec('./bin/wd props --type -l en')
    .then(res => {
      const data = JSON.parse(res.stdout)
      data.P6.label.should.equal('head of government')
      data.P6.type.should.equal('WikibaseItem')
      done()
    })
    .catch(done)
  })

  it('should be able to query a custom SPARQL endpoint', done => {
    shellExec('./bin/wb props --sparql-endpoint https://wikibase-registry-query.wmflabs.org/proxy/wdqs/bigdata/namespace/wdq/sparql -l en')
    .then(res => {
      const data = JSON.parse(res.stdout)
      data['P2'].toLowerCase().should.equal('main page')
      done()
    })
    .catch(done)
  })
})
