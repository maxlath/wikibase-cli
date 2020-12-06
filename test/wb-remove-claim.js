require('should')
const { wbDry } = require('./lib/utils')

describe('wb remove-claim', () => {
  it('should accept a guid', async () => {
    const { stdout, stderr } = await wbDry("remove-qualifier 'Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F'")
    stderr.should.equal('')
    JSON.parse(stdout).should.deepEqual({
      guid: 'Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F',
    })
  })

  it('should accept a hyphenated guid', async () => {
    const { stdout, stderr } = await wbDry('remove-qualifier Q4115189-13681798-47F7-4D51-B3B4-BA8C7E044E1F')
    stderr.should.equal('')
    JSON.parse(stdout).should.deepEqual({
      guid: 'Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F',
    })
  })
})
