import 'should'
import { shellExec } from '#tests/lib/utils'

describe('wb revisions', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wb.js revisions')
    stdout.should.containEql('Usage:')
  })

  it('should accept ids as arguments', async () => {
    const { stdout } = await shellExec('./bin/wd.js revisions -n 2 Q66636975')
    const lines = stdout.split('\n')
    lines.length.should.equal(1)
    const history = JSON.parse(lines)
    history.revisions.length.should.equal(2)
  })

  it('should accept ids on stdin', async () => {
    const { stdout } = await shellExec('echo Q66636975 | ./bin/wd.js revisions -n 2')
    const lines = stdout.split('\n')
    lines.length.should.equal(1)
    const history = JSON.parse(lines)
    history.revisions.length.should.equal(2)
  })
})
