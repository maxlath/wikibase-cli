require('should')
const { shellExec } = require('./lib/utils')

describe('wb revisions', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wb revisions')
    stdout.should.containEql('Usage:')
  })
})
