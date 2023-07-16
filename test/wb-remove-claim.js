import 'should'
import { wbDry } from '#test/lib/utils'

describe('wb remove-claim', () => {
  it('should accept a guid', async () => {
    const { stdout, stderr } = await wbDry("remove-claim 'Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F'")
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('claim')
    action.should.equal('remove')
    args.should.deepEqual([
      {
        guid: [ 'Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F' ],
      },
    ])
  })

  it('should accept a hyphenated guid', async () => {
    const { stdout, stderr } = await wbDry('remove-claim Q4115189-13681798-47F7-4D51-B3B4-BA8C7E044E1F')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('claim')
    action.should.equal('remove')
    args.should.deepEqual([
      {
        guid: [ 'Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F' ],
      },
    ])
  })
})
