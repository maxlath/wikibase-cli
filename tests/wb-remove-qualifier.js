import 'should'
import { wbDry } from '#tests/lib/utils'

describe('wb remove-qualifier', () => {
  it('should add a guid and a hash', async () => {
    const { stdout, stderr } = await wbDry("remove-qualifier 'Q4115189$E51978A1-D13A-4916-800E-74ACD2466970' '24aa18192de7051f81d88d1ab514826002d51c14'")
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('qualifier')
    action.should.equal('remove')
    args.should.deepEqual([
      {
        guid: 'Q4115189$E51978A1-D13A-4916-800E-74ACD2466970',
        hash: [ '24aa18192de7051f81d88d1ab514826002d51c14' ],
      },
    ])
  })

  it('should add a hyphenated guid and a hash', async () => {
    const { stdout, stderr } = await wbDry("remove-qualifier 'Q4115189-E51978A1-D13A-4916-800E-74ACD2466970' '24aa18192de7051f81d88d1ab514826002d51c14'")
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('qualifier')
    action.should.equal('remove')
    args.should.deepEqual([
      {
        guid: 'Q4115189$E51978A1-D13A-4916-800E-74ACD2466970',
        hash: [ '24aa18192de7051f81d88d1ab514826002d51c14' ],
      },
    ])
  })

  it('should add a guid and multiple piped hashes', async () => {
    const { stdout, stderr } = await wbDry("remove-qualifier 'Q4115189-E51978A1-D13A-4916-800E-74ACD2466970' '24aa18192de7051f81d88d1ab514826002d51c14|f6c14e4eebb3d4f7595f0952c1ece0a34d85368b'")
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('qualifier')
    action.should.equal('remove')
    args.should.deepEqual([
      {
        guid: 'Q4115189$E51978A1-D13A-4916-800E-74ACD2466970',
        hash: [ '24aa18192de7051f81d88d1ab514826002d51c14', 'f6c14e4eebb3d4f7595f0952c1ece0a34d85368b' ],
      },
    ])
  })
})
