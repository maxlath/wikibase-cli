require('should')
const { shellExec } = require('./lib/utils')

describe('wb sparql', function () {
  this.timeout(20000)
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd sparql')
    stdout.should.containEql('Usage:')
  })

  it('should take a file path', async () => {
    const { stdout } = await shellExec('./bin/wd sparql ./test/assets/query.rq')
    stdout.should.containEql('Q18120925')
  })

  describe('dry', () => {
    it('should return the generated SPARQL', async () => {
      const { stdout } = await shellExec('./bin/wd sparql ./test/assets/query.rq --dry')
      stdout.should.containEql('SELECT')
    })
  })
})
