import 'should'
import { shellExec } from '#test/lib/utils'

describe('wb config', () => {
  it('should display config', async () => {
    const { stdout } = await shellExec('./bin/wb.js config')
    stdout.should.containEql('Current config')
  })

  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wb.js config --help')
    stdout.should.containEql('Usage:')
  })
})
