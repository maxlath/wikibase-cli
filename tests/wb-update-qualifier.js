import 'should'
import { wbDry } from '#tests/lib/utils'

describe('wb update-qualifier', () => {
  it('should accept a guid, a property, and old and a new value', async () => {
    const { stdout, stderr } = await wbDry("update-qualifier 'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P155 'Q13406268' 'Q3576110'")
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('qualifier')
    action.should.equal('update')
    args.should.deepEqual([
      {
        guid: 'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F',
        property: 'P155',
        oldValue: 'Q13406268',
        newValue: 'Q3576110',
      },
    ])
  })

  it('should accept a hyphenated guid', async () => {
    const { stdout, stderr } = await wbDry("update-qualifier 'Q4115189-E66DBC80-CCC1-4899-90D4-510C9922A04F' P155 'Q13406268' 'Q3576110'")
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('qualifier')
    action.should.equal('update')
    args.should.deepEqual([
      {
        guid: 'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F',
        property: 'P155',
        oldValue: 'Q13406268',
        newValue: 'Q3576110',
      },
    ])
  })

  it('should accept a rich values', async () => {
    const { stdout, stderr } = await wbDry("update-qualifier 'Q4115189-E66DBC80-CCC1-4899-90D4-510C9922A04F' P3132 'text=aaah&language=fr' 'text=ach sooo&language=de'")
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('qualifier')
    action.should.equal('update')
    args.should.deepEqual([
      {
        guid: 'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F',
        property: 'P3132',
        oldValue: 'text=aaah&language=fr',
        newValue: 'text=ach sooo&language=de',
      },
    ])
  })
})
