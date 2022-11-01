require('should')
const { wbDry } = require('./lib/utils')

describe('wb add-alias', () => {
  it('should accept an id, a lang, and a value', async () => {
    const { stdout, stderr } = await wbDry('add-alias Q4115189 fr foo')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('alias')
    action.should.equal('add')
    args.should.deepEqual([
      {
        id: 'Q4115189',
        language: 'fr',
        value: [ 'foo' ]
      }
    ])
  })

  it('should accept an id, a lang, and multipled piped values', async () => {
    const { stdout, stderr } = await wbDry('add-alias Q4115189 fr "foo|bar|buzz"')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('alias')
    action.should.equal('add')
    args.should.deepEqual([
      {
        id: 'Q4115189',
        language: 'fr',
        value: [ 'foo', 'bar', 'buzz' ]
      }
    ])
  })
})
