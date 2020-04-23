require('should')
const { shellExec } = require('./lib/utils')

describe('wb sparql', function () {
  this.timeout(20000)
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd sparql')
    stdout.split('Usage:').length.should.equal(2)
  })

  it('should take a file path', async () => {
    const { stdout } = await shellExec('./bin/wd sparql ./test/assets/query.rq')
    stdout.split('Q18120925').length.should.equal(2)
  })
})
