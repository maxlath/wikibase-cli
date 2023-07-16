import 'should'
import { wbDry } from '#test/lib/utils'

describe('wb update-claim', () => {
  it('should accept a guid and a value', async () => {
    const { stdout, stderr } = await wbDry("update-claim 'Q4115189$bc43ae33-7525-42cb-ad31-b1e1cf3cb72d' Bulgroz")
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('claim')
    action.should.equal('update')
    args.should.deepEqual([
      {
        guid: 'Q4115189$bc43ae33-7525-42cb-ad31-b1e1cf3cb72d',
        newValue: 'Bulgroz',
      },
    ])
  })

  it('should accept a hyphenated guid and a value', async () => {
    const { stdout, stderr } = await wbDry('update-claim Q4115189-bc43ae33-7525-42cb-ad31-b1e1cf3cb72d Bulgroz')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('claim')
    action.should.equal('update')
    args.should.deepEqual([
      {
        guid: 'Q4115189$bc43ae33-7525-42cb-ad31-b1e1cf3cb72d',
        newValue: 'Bulgroz',
      },
    ])
  })

  it('should accept an id, a property, and old and a new value', async () => {
    const { stdout, stderr } = await wbDry('update-claim Q4115189 P2002 Zorglub Bulgroz')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('claim')
    action.should.equal('update')
    args.should.deepEqual([
      {
        id: 'Q4115189',
        property: 'P2002',
        oldValue: 'Zorglub',
        newValue: 'Bulgroz',
      },
    ])
  })

  it('should accept a guid and a rank alone', async () => {
    const { stdout, stderr } = await wbDry('update-claim Q4115189-bc43ae33-7525-42cb-ad31-b1e1cf3cb72d --rank preferred')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('claim')
    action.should.equal('update')
    args.should.deepEqual([
      {
        guid: 'Q4115189$bc43ae33-7525-42cb-ad31-b1e1cf3cb72d',
        rank: 'preferred',
      },
    ])
  })

  it('should accept arguments as a single JSON object', async () => {
    const { stdout, stderr } = await wbDry("update-claim '{ \"guid\": \"Q4115189$bc43ae33-7525-42cb-ad31-b1e1cf3cb72d\", \"rank\": \"preferred\" }'")
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('claim')
    action.should.equal('update')
    args.should.deepEqual([
      {
        guid: 'Q4115189$bc43ae33-7525-42cb-ad31-b1e1cf3cb72d',
        rank: 'preferred',
      },
    ])
  })
})
