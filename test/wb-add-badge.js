require('should')
const { wbDry } = require('./lib/utils')

describe('wb add-badge', () => {
  it('should accept an id, a site, and badges ids', async () => {
    const { stdout, stderr } = await wbDry('add-badge Q4115189 frwiki Q608,Q609')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('badge')
    action.should.equal('add')
    args.should.deepEqual([
      {
        id: 'Q4115189',
        site: 'frwiki',
        badges: [ 'Q608', 'Q609' ]
      }
    ])
  })
})
