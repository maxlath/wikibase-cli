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

  it('should an inline JSON object', async () => {
    const guid = 'Q4115189$c885b63e-46f9-3f51-5736-d3ed09a58acf'
    const { stdout, stderr } = await wbDry(`add-reference '{"guid":"${guid}","snaks":{"P248":"Q1150348","P1157":"S001191","P813":"2021-01-28"}}'`)
    stderr.should.equal('')
    JSON.parse(stdout).should.deepEqual({
      guid,
      snaks: {
        P248: 'Q1150348',
        P1157: 'S001191',
        P813: '2021-01-28'
      }
    })
  })

  it('should accept a JSON path', async () => {
    const { stdout, stderr } = await wbDry('add-reference ./test/assets/add_some_reference.json')
    stderr.should.equal('')
    JSON.parse(stdout).should.deepEqual({
      guid: 'Q4115189$c885b63e-46f9-3f51-5736-d3ed09a58acf',
      snaks: {
        P248: 'Q1150348',
        P1157: 'S001191',
        P813: '2021-01-28'
      }
    })
  })

  it('should accept a JS module path and arguments', async () => {
    const { stdout, stderr } = await wbDry('add-reference ./test/assets/add_some_reference.js Q4115189-c885b63e-46f9-3f51-5736-d3ed09a58acf S001191')
    stderr.should.equal('')
    JSON.parse(stdout).should.deepEqual({
      guid: 'Q4115189$c885b63e-46f9-3f51-5736-d3ed09a58acf',
      snaks: {
        P248: 'Q1150348',
        P1157: 'S001191',
        P813: new Date().toISOString().split('T')[0]
      }
    })
  })
})
