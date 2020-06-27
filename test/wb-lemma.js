require('should')
const { shellExec } = require('./lib/utils')

describe('wb lemma', function () {
  this.timeout(20000)

  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd lemma')
    stdout.should.containEql('Usage:')
  })

  it("should find an entity's lemma", async () => {
    const { stdout } = await shellExec('./bin/wd lemma L525')
    stdout.should.equal('maison')
  })
})
