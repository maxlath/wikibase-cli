require('should')
const { shellExec } = require('./lib/utils')
const { undesiredRes } = require('./lib/utils')

describe('wb label', function () {
  this.timeout(20000)

  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd label')
    stdout.should.containEql('Usage:')
  })

  it("should find an entity's label", async () => {
    const { stdout } = await shellExec('./bin/wd label Q123456')
    stdout.should.equal('Friedrichshafen')
  })

  it('should not fallback on another language if a language is explicitly specificed', done => {
    shellExec('./bin/wd label --lang uk Q15726039')
    .then(undesiredRes(done))
    .catch(({ stderr }) => {
      stderr.trim().should.equal('no result found')
      done()
    })
    .catch(done)
  })

  it('should be tolerant on input', async () => {
    const { stdout } = await shellExec('./bin/wd label azfzafzafazQ123456fazafazfz')
    stdout.should.equal('Friedrichshafen')
  })
})
