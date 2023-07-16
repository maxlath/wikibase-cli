import 'should'
import { wbDry } from '#test/lib/utils'

describe('wb remove-sitelink', () => {
  it('should accept an id, and a site', async () => {
    const { stdout, stderr } = await wbDry('remove-sitelink Q4115189 frwiki')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('sitelink')
    action.should.equal('set')
    args.should.deepEqual([
      {
        id: 'Q4115189',
        site: 'frwiki',
        title: null,
      },
    ])
  })
})
