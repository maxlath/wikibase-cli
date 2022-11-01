require('should')
const { wbDry } = require('./lib/utils')

describe('wb add-qualifier', () => {
  it('should accept a guid, a property, and value', async () => {
    const { stdout, stderr } = await wbDry("add-qualifier 'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P155 'Q13406268'")
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('qualifier')
    action.should.equal('add')
    args.should.deepEqual([
      {
        guid: 'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F',
        property: 'P155',
        value: 'Q13406268'
      }
    ])
  })

  it('should accept a hyphenated guid, a property, and value', async () => {
    const { stdout, stderr } = await wbDry("add-qualifier 'Q4115189-E66DBC80-CCC1-4899-90D4-510C9922A04F' P155 'Q13406268'")
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('qualifier')
    action.should.equal('add')
    args.should.deepEqual([
      {
        guid: 'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F',
        property: 'P155',
        value: 'Q13406268'
      }
    ])
  })

  it('should accept a rich value as querystring', async () => {
    const { stdout, stderr } = await wbDry("add-qualifier 'Q4115189-E66DBC80-CCC1-4899-90D4-510C9922A04F' P155 'amount=123&unit=Q4916'")
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('qualifier')
    action.should.equal('add')
    args.should.deepEqual([
      {
        guid: 'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F',
        property: 'P155',
        value: 'amount=123&unit=Q4916'
      }
    ])
  })

  it('should accept a rich value as a JSON object', async () => {
    const { stdout, stderr } = await wbDry("add-qualifier 'Q4115189-E66DBC80-CCC1-4899-90D4-510C9922A04F' P155 '{\"amount\":123,\"unit\":\"Q4916\"}'")
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('qualifier')
    action.should.equal('add')
    args.should.deepEqual([
      {
        guid: 'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F',
        property: 'P155',
        value: '{"amount":123,"unit":"Q4916"}'
      }
    ])
  })
})
