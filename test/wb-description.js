require('should')
const { shellExec } = require('./lib/utils')

describe('wb description', function () {
  this.timeout(20000)

  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd description')
    stdout.split('Usage:').length.should.equal(2)
  })

  it('<entity>', async () => {
    const { stdout } = await shellExec('./bin/wd description Q123456 -l en')
    stdout.should.equal('Wikimedia disambiguation page')
  })

  it('<entity> should be tolerant on input', async () => {
    const { stdout } = await shellExec('./bin/wd description  -l en azfzafzafazQ123456fazafazfz')
    stdout.should.equal('Wikimedia disambiguation page')
  })
})
