require('should')
const { wbDry } = require('./lib/utils')

describe('wb add-reference', () => {
  it('should accept a guid, a property and a value', async () => {
    const { stdout, stderr } = await wbDry("add-reference 'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P854 https://example.org/rise-and-box-of-the-holy-sand-box")
    stderr.should.equal('')
    JSON.parse(stdout).should.deepEqual({
      guid: 'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F',
      property: 'P854',
      value: 'https://example.org/rise-and-box-of-the-holy-sand-box'
    })
  })

  it('should accept a hyphenated guid, a property and a value', async () => {
    const { stdout, stderr } = await wbDry('add-reference Q4115189-E66DBC80-CCC1-4899-90D4-510C9922A04F P854 https://example.org/rise-and-box-of-the-holy-sand-box')
    stderr.should.equal('')
    JSON.parse(stdout).should.deepEqual({
      guid: 'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F',
      property: 'P854',
      value: 'https://example.org/rise-and-box-of-the-holy-sand-box'
    })
  })
})
