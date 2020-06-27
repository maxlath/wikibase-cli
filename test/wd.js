require('should')
const { shellExec } = require('./lib/utils')

describe('wd', function () {
  this.timeout(20000)

  it('should display general help', async () => {
    const { stdout } = await shellExec('./bin/wd')
    stdout.should.containEql('Usage:')
  })

  it('should log an error and display help when called with an unknown command', async () => {
    const { stdout, stderr } = await shellExec('./bin/wd nop')
    stderr.should.equal('unknown command')
    stdout.should.containEql('Usage:')
  })
})
