require('should')
const { shellExec } = require('./lib/utils')
const Q123456EnglishSummary = `id Q123456
Label Friedrichshafen
Description Wikimedia disambiguation page
instance of (P31): Wikimedia disambiguation page (Q4167410)`

describe('wb summary', function () {
  this.timeout(20000)
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd summary')
    stdout.should.containEql('Usage:')
  })

  it('<entity>', async () => {
    const { stdout } = await shellExec('./bin/wd summary Q123456 -l en')
    stdout.should.equal(Q123456EnglishSummary)
  })

  it('<entity> should be tolerant on input', async () => {
    const { stdout } = await shellExec('./bin/wd summary -l en azfzafzafazQ123456fazafazfz')
    stdout.should.equal(Q123456EnglishSummary)
  })
})
