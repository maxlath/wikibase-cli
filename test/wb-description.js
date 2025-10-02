import 'should'
import { shellExec } from '#test/lib/utils'

describe('wb description', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd.js description')
    stdout.should.containEql('Usage:')
  })

  it('<entity>', async () => {
    const { stdout } = await shellExec('./bin/wd.js description Q24835 -l en')
    stdout.should.equal('Wikimedia disambiguation page')
  })

  it('<entity> should be tolerant on input', async () => {
    const { stdout } = await shellExec('./bin/wd.js description  -l en azfzafzafazQ24835fazafazfz')
    stdout.should.equal('Wikimedia disambiguation page')
  })
})
