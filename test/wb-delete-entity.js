require('should')
const { wbDry } = require('./lib/utils')

describe('wb delete-entity', () => {
  it('should accept an id', async () => {
    const { stdout, stderr } = await wbDry('delete-entity Q1111')
    stderr.should.equal('')
    JSON.parse(stdout).should.deepEqual({ id: 'Q1111' })
  })
})
