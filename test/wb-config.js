require('should')
const { shellExec } = require('./lib/utils')

describe('wb config', () => {
  it('should display config', async () => {
    const { stdout } = await shellExec('./bin/wb config')
    stdout.should.containEql('Current config')
  })

  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wb config --help')
    stdout.should.containEql('Usage:')
  })
})
