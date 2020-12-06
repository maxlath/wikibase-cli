require('should')
const { wbDry } = require('./lib/utils')

describe('wb merge-entity', () => {
  it('should accept two ids', async () => {
    const { stdout, stderr } = await wbDry('merge-entity Q1111 Q1112')
    stderr.should.equal('')
    JSON.parse(stdout).should.deepEqual({ from: 'Q1111', to: 'Q1112' })
  })
})
