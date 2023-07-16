import 'should'
import { shellExec } from '#test/lib/utils'

describe('wb revisions', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wb.js revisions')
    stdout.should.containEql('Usage:')
  })
})
