require('should')
const { shellExec } = require('./lib/utils')

describe('wb hub', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wb hub')
    stdout.should.containEql('Usage:')
  })

  it('should return a url', async () => {
    const { stdout } = await shellExec('./bin/wb hub --url 10.1103/REVMODPHYS.29.547 lang=de')
    stdout.should.equal('https://hub.toolforge.org/query?q=10.1103%2FREVMODPHYS.29.547%20lang%3Dde%20site%3Dwikidata')
  })
})
