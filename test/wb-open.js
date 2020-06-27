require('should')
const { shellExec } = require('./lib/utils')

describe('wb open', function () {
  this.timeout(20000)

  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd open')
    stdout.should.containEql('Usage:')
  })
})
