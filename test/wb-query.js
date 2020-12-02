require('should')
const { shellExec } = require('./lib/utils')
const { isItemId } = require('wikibase-sdk')

describe('wb query', function () {
  this.timeout(20000)

  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd query')
    stdout.should.containEql('Usage:')
  })

  it('-p [prop] -o [obj] -t [limit]', async () => {
    const { stdout } = await shellExec('./bin/wd query -p P50 -o Q1345582')
    stdout.split(/\s/).includes('Q18120925').should.be.true()
  })

  it('should work for URL values', async () => {
    const { stdout } = await shellExec("./bin/wd query -p P973 -o '<https://www.fileformat.info/format/gif/egff.htm>'")
    stdout.split(/\s/).includes('Q2192').should.be.true()
  })

  describe('format', () => {
    it('should default to table format', async () => {
      const { stdout } = await shellExec('./bin/wd q -p P31 -o Q5 -n 2')
      stdout.split('\n').length.should.equal(2)
      stdout.split('\n').forEach(id => isItemId(id).should.be.true())
    })

    it('should support inline format', async () => {
      const { stdout } = await shellExec('./bin/wd q -p P31 -o Q5 -n 2 --format inline')
      stdout.split(' ').length.should.equal(2)
      stdout.split(' ').forEach(id => isItemId(id).should.be.true())
    })

    it('should support json format', async () => {
      const { stdout } = await shellExec('./bin/wd q -p P31 -o Q5 -n 2 --format json')
      const data = JSON.parse(stdout)
      data.should.be.an.Array()
      data.length.should.equal(2)
      data.forEach(id => isItemId(id).should.be.true())
    })

    it('should support csv format', async () => {
      const { stdout } = await shellExec('./bin/wd q -p P31 -n 2 --format csv')
      const lines = stdout.split('\n')
      lines[0].trim().should.equal('subject,object')
      lines.slice(1).length.should.equal(2)
      lines.slice(1).forEach(url => url.should.startWith('http://www.wikidata.org/entity/Q'))
    })

    it('should support tsv format', async () => {
      const { stdout } = await shellExec('./bin/wd q -p P31 -n 2 --format tsv')
      const lines = stdout.split('\n')
      // eslint-disable-next-line no-tabs
      lines[0].trim().should.equal('?subject	?object')
      lines.slice(1).length.should.equal(2)
      lines.slice(1).forEach(url => url.should.startWith('<http://www.wikidata.org/entity/Q'))
    })
  })

  describe('dry', () => {
    it('should return the generated SPARQL', async () => {
      const { stdout } = await shellExec('./bin/wd query -p P50 -o Q1345582 --dry')
      stdout.should.containEql('SELECT')
    })
  })
})
