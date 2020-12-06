require('should')
const { wbDry } = require('./lib/utils')

describe('wb set-label', () => {
  it('should accept an id, a lang, and a value', async () => {
    const { stdout, stderr } = await wbDry('set-label Q4115189 fr foo')
    stderr.should.equal('')
    JSON.parse(stdout).should.deepEqual({
      id: 'Q4115189',
      language: 'fr',
      value: 'foo'
    })
  })
})
