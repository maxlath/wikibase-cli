import 'should'
import { wbDry } from '#tests/lib/utils'

describe('wb remove-label', () => {
  it('should accept an id, and a language', async () => {
    const { stdout, stderr } = await wbDry('remove-label Q4115189 fr')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('label')
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
