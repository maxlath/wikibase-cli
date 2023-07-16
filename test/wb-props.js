import 'should'
import { shellExec } from '#test/lib/utils'

describe('wb props', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd.js props --help')
    stdout.should.containEql('Usage:')
  })

  it('should output properties', async () => {
    const { stdout } = await shellExec('./bin/wd.js props')
    stdout.startsWith('{').should.be.true()
    stdout.should.containEql('"P6": "')
  })

  it('should output properties with types', async () => {
    const { stdout } = await shellExec('./bin/wd.js props --type -l en')
    const data = JSON.parse(stdout)
    data.P6.label.should.equal('head of government')
    data.P6.type.should.equal('WikibaseItem')
  })

  it('should filter by types', async () => {
    const { stdout } = await shellExec('./bin/wd.js props --type CommonsMedia -l en')
    const data = JSON.parse(stdout)
    Object.keys(data).length.should.be.below(1000)
    data.P18.type.should.equal('CommonsMedia')
  })

  it('should be able to query a custom SPARQL endpoint', async () => {
    const { stdout } = await shellExec('./bin/wb.js props --sparql-endpoint https://wikibase.world/query/sparql -l en')
    const data = JSON.parse(stdout)
    data.P1.should.equal('URL')
  })
})
