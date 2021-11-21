require('should')
const { shellExec } = require('./lib/utils')

describe('wb open', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd open')
    stdout.should.containEql('Usage:')
  })
})
