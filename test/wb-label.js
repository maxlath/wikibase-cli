import 'should'
import { shellExec, shouldNotBeCalled } from '#test/lib/utils'

describe('wb label', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd.js label')
    stdout.should.containEql('Usage:')
  })

  it("should find an entity's label", async () => {
    const { stdout } = await shellExec('./bin/wd.js label Q123456')
    stdout.should.equal('Friedrichshafen')
  })

  it('should not fallback on another language if a language is explicitly specificed', async () => {
    await shellExec('./bin/wd.js label --lang uk Q15726039')
    .then(shouldNotBeCalled)
    .catch(({ stderr }) => {
      stderr.trim().should.equal('no result found')
    })
  })

  it('should accept an id within a string', async () => {
    const { stdout } = await shellExec('./bin/wd.js label azfzafzafazQ123456fazafazfz')
    stdout.should.equal('Friedrichshafen')
  })

  it('should accept a uri', async () => {
    const { stdout } = await shellExec('./bin/wd.js label wd:Q123456')
    stdout.should.equal('Friedrichshafen')
  })

  it('should accept a lowercased id', async () => {
    const { stdout } = await shellExec('./bin/wd.js label q123456')
    stdout.should.equal('Friedrichshafen')
  })
})
