import 'should'
import { shellExec } from '#test/lib/utils'

describe('wb open', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd.js open')
    stdout.should.containEql('Usage:')
  })
})
