require('should')
const { shellExec } = require('./lib/utils')

describe('wb lemma', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd lemma')
    stdout.should.containEql('Usage:')
  })

  it("should find an entity's lemma", async () => {
    const { stdout } = await shellExec('./bin/wd lemma L525')
    stdout.should.equal('maison')
  })
})
