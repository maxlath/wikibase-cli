require('should')
const { wbDry } = require('./lib/utils')

describe('wb move-qualifier', () => {
  it('should accept a guid, and two properties', async () => {
    const { stdout, stderr } = await wbDry("move-qualifier 'Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F' P2310 P2311")
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('qualifier')
    action.should.equal('move')
    args.should.deepEqual([
      {
        guid: 'Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F',
        oldProperty: 'P2310',
        newProperty: 'P2311'
      }
    ])
  })

  it('should accept a hyphenated guid, and two properties', async () => {
    const { stdout, stderr } = await wbDry('move-qualifier Q4115189-13681798-47F7-4D51-B3B4-BA8C7E044E1F P2310 P2311')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('qualifier')
    action.should.equal('move')
    args.should.deepEqual([
      {
        guid: 'Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F',
        oldProperty: 'P2310',
        newProperty: 'P2311'
      }
    ])
  })

  it('should accept a guid, a qualifier hash, and two properties', async () => {
    const { stdout, stderr } = await wbDry("move-qualifier 'Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F' 90b9b567dc01112e7d9dee98eb5f5ad50ae803bb P2310 P2311")
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('qualifier')
    action.should.equal('move')
    args.should.deepEqual([
      {
        guid: 'Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F',
        hash: '90b9b567dc01112e7d9dee98eb5f5ad50ae803bb',
        oldProperty: 'P2310',
        newProperty: 'P2311'
      }
    ])
  })
})
