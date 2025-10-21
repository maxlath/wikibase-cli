import 'should'
import { isItemId } from 'wikibase-sdk'
import { shellExec } from '#tests/lib/utils'

describe('wb query', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd.js query')
    stdout.should.containEql('Usage:')
  })

  it('-p [prop] -o [obj] -t [limit]', async () => {
    const { stdout } = await shellExec('./bin/wd.js query -p P50 -o Q1345582')
    stdout.split(/\s/).includes('Q22117440').should.be.true()
  })

  it('should work for URL values', async () => {
    const { stdout } = await shellExec("./bin/wd.js query -p P973 -o '<https://www.fileformat.info/format/gif/egff.htm>'")
    stdout.split(/\s/).includes('Q2192').should.be.true()
  })

  describe('format', () => {
    it('should default to table format', async () => {
      const { stdout } = await shellExec('./bin/wd.js q -p P921 -o Q2005 -n 2')
      stdout.split('\n').length.should.equal(2)
      stdout.split('\n').forEach(id => isItemId(id).should.be.true())
    })

    it('should support inline format', async () => {
      const { stdout } = await shellExec('./bin/wd.js q -p P921 -o Q2005 -n 2 --format inline')
      stdout.split(' ').length.should.equal(2)
      stdout.split(' ').forEach(id => isItemId(id).should.be.true())
    })

    it('should support json format', async () => {
      const { stdout } = await shellExec('./bin/wd.js q -p P921 -o Q2005 -n 2 --format json')
      const data = JSON.parse(stdout)
      data.should.be.an.Array()
      data.length.should.equal(2)
      data.forEach(id => isItemId(id).should.be.true())
    })

    it('should support csv format', async () => {
      const { stdout } = await shellExec('./bin/wd.js q -p P921 -n 2 --format csv', { trim: false })
      const lines = stdout.split('\n')
      lines[0].trim().should.equal('subject,object')
      lines.slice(1).length.should.equal(3)
      lines.slice(1, -1).forEach(url => url.should.startWith('http://www.wikidata.org/entity/Q'))
      lines.slice(-1)[0].should.equal('')
    })

    it('should support tsv format', async () => {
      const { stdout } = await shellExec('./bin/wd.js q -p P921 -n 2 --format tsv')
      const lines = stdout.split('\n')
      // eslint-disable-next-line @stylistic/no-tabs
      lines[0].trim().should.equal('?subject	?object')
      lines.slice(1).length.should.equal(2)
      lines.slice(1).forEach(url => url.should.startWith('<http://www.wikidata.org/entity/Q'))
    })
  })

  describe('dry', () => {
    it('should return the generated SPARQL', async () => {
      const { stdout } = await shellExec('./bin/wd.js query -p P50 -o Q1345582 --dry')
      stdout.should.containEql('SELECT')
    })
  })

  describe('describe', () => {
    it('should make a DESCRIBE request with an item id', async () => {
      const { stdout } = await shellExec('./bin/wd.js query --describe Q1345582 --dry')
      stdout.should.containEql('DESCRIBE wd:Q1345582')
    })

    it('should make a DESCRIBE request with a url', async () => {
      const { stdout } = await shellExec('./bin/wd.js query --describe http://bnb.data.bl.uk/id/person/OBrienJim1950- --dry')
      stdout.should.containEql('DESCRIBE <http://bnb.data.bl.uk/id/person/OBrienJim1950->')
    })
  })
})
