require('should')
const { shellExec } = require('./lib/utils')

describe('wb hub', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wb hub')
    stdout.should.containEql('Usage:')
  })
})
