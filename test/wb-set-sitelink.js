require('should')
const { wbDry } = require('./lib/utils')

describe('wb set-sitelink', () => {
  it('should accept an id, a site, and a title', async () => {
    const { stdout, stderr } = await wbDry('set-sitelink Q4115189 frwiki foo')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('sitelink')
    action.should.equal('set')
    args.should.deepEqual([
      {
        id: 'Q4115189',
        site: 'frwiki',
        title: 'foo',
        badges: []
      }
    ])
  })

  it('should also accept badges', async () => {
    const { stdout, stderr } = await wbDry('set-sitelink Q4115189 frwiki foo Q123,Q512')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('sitelink')
    action.should.equal('set')
    args.should.deepEqual([
      {
        id: 'Q4115189',
        site: 'frwiki',
        title: 'foo',
        badges: [ 'Q123', 'Q512' ]
      }
    ])
  })
})
