require('should')
const { shellExec } = require('./lib/utils')

describe('wb aliases', function () {
  this.timeout(20000)

  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd aliases')
    stdout.should.containEql('Usage:')
  })

  it('<entity>', async () => {
    const { stdout } = await shellExec('./bin/wd aliases Q123')
    stdout.should.match(/sept/i)
  })

  it('<entity> should be tolerant on input', async () => {
    const { stdout } = await shellExec('./bin/wd aliases azfzafzafazQ123fazafazfz')
    stdout.should.match(/sept/i)
  })
})
