import 'should'
import { wbDry } from '#test/lib/utils'

describe('wb move-claim', () => {
  it('should accept a guid, a target id, and a target property', async () => {
    const { stdout, stderr } = await wbDry("move-claim 'Q4115189$bc43ae33-7525-42cb-ad31-b1e1cf3cb72d' Q4115189 P20")
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('claim')
    action.should.equal('move')
    args.should.deepEqual([
      {
        guid: 'Q4115189$bc43ae33-7525-42cb-ad31-b1e1cf3cb72d',
        id: 'Q4115189',
        property: 'P20',
      },
    ])
  })

  it('should accept a hyphenated guid, a target id, and a target property', async () => {
    const { stdout, stderr } = await wbDry('move-claim Q4115189-bc43ae33-7525-42cb-ad31-b1e1cf3cb72d Q4115189 P20')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('claim')
    action.should.equal('move')
    args.should.deepEqual([
      {
        guid: 'Q4115189$bc43ae33-7525-42cb-ad31-b1e1cf3cb72d',
        id: 'Q4115189',
        property: 'P20',
      },
    ])
  })

  it('should accept a property claims id, a target id, and a target property', async () => {
    const { stdout, stderr } = await wbDry('move-claim Q4115189#P19 Q4115189 P20')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('claim')
    action.should.equal('move')
    args.should.deepEqual([
      {
        propertyClaimsId: 'Q4115189#P19',
        id: 'Q4115189',
        property: 'P20',
      },
    ])
  })
})
