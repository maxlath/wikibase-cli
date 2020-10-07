require('should')
const { shellExec } = require('./lib/utils')

describe('wb props', function () {
  this.timeout(20000)

  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd props --help')
    stdout.should.containEql('Usage:')
  })

  it('should output properties', async () => {
    const { stdout } = await shellExec('./bin/wd props')
    stdout.startsWith('{').should.be.true()
    stdout.should.containEql('"P6": "')
  })

  it('should output properties with types', async () => {
    const { stdout } = await shellExec('./bin/wd props --type -l en')
    const data = JSON.parse(stdout)
    data.P6.label.should.equal('head of government')
    data.P6.type.should.equal('WikibaseItem')
  })

  it('should be able to query a custom SPARQL endpoint', async () => {
    const { stdout } = await shellExec('./bin/wb props --sparql-endpoint https://wikibase-registry-query.wmflabs.org/proxy/wdqs/bigdata/namespace/wdq/sparql -l en')
    const data = JSON.parse(stdout)
    data.P2.toLowerCase().should.equal('main page')
  })
})
