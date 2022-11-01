require('should')
const { wbDry } = require('./lib/utils')

describe('wb merge-entity', () => {
  it('should accept two ids', async () => {
    const { stdout, stderr } = await wbDry('merge-entity Q1111 Q1112')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('entity')
    action.should.equal('merge')
    args.should.deepEqual([ { from: 'Q1111', to: 'Q1112' } ])
  })
})
