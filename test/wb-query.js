require('should')
const { shellExec } = require('./lib/utils')

describe('wb query', function () {
  this.timeout(20000)

  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd query')
    stdout.split('Usage:').length.should.equal(2)
  })

  it('-p [prop] -o [obj] -t [limit]', async () => {
    const { stdout } = await shellExec('./bin/wd query -p P50 -o Q1345582')
    stdout.split(/\s/).includes('Q18120925').should.be.true()
  })

  it('should work for URL values', async () => {
    const { stdout } = await shellExec("./bin/wd query -p P973 -o '<https://www.fileformat.info/format/gif/egff.htm>'")
    stdout.split(/\s/).includes('Q2192').should.be.true()
  })
})
