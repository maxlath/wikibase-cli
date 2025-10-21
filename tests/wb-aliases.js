import 'should'
import { shellExec } from '#tests/lib/utils'

describe('wb aliases', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd.js aliases')
    stdout.should.containEql('Usage:')
  })

  it('<entity>', async () => {
    const { stdout } = await shellExec('./bin/wd.js aliases Q123')
    stdout.should.match(/sept/i)
  })

  it('<entity> should be tolerant on input', async () => {
    const { stdout } = await shellExec('./bin/wd.js aliases azfzafzafazQ123fazafazfz')
    stdout.should.match(/sept/i)
  })
})
