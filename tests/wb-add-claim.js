import 'should'
import { wbDry } from '#tests/lib/utils'

describe('wb add-claim', () => {
  it('should add a claim', async () => {
    const { stdout, stderr } = await wbDry('add-claim Q1111 P95180 "add-claim test"')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('claim')
    action.should.equal('create')
    args.should.deepEqual([
      {
        id: 'Q1111',
        property: 'P95180',
        value: 'add-claim test',
      },
    ])
  })
})
