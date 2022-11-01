require('should')
const { wbDry } = require('./lib/utils')

describe('wb delete-entity', () => {
  it('should accept an id', async () => {
    const { stdout, stderr } = await wbDry('delete-entity Q1111')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('entity')
    action.should.equal('delete')
    args.should.deepEqual([
      { id: 'Q1111' }
    ])
  })
})
