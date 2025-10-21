import 'should'
import { wbDry } from '#tests/lib/utils'

describe('wb remove-description', () => {
  it('should accept an id, and a language', async () => {
    const { stdout, stderr } = await wbDry('remove-description Q4115189 fr')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('description')
    action.should.equal('set')
    args.should.deepEqual([
      {
        id: 'Q4115189',
        language: 'fr',
        value: null,
      },
    ])
  })
})
