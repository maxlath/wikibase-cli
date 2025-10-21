import 'should'
import { shellExec } from '#tests/lib/utils'

describe('wb lemma', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd.js lemma')
    stdout.should.containEql('Usage:')
  })

  it("should find an entity's lemma", async () => {
    const { stdout } = await shellExec('./bin/wd.js lemma L525')
    stdout.should.equal('maison')
  })
})
