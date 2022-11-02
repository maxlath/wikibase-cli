require('should')
const { wdTest } = require('./lib/utils')

describe('wb badge', () => {
  it('should accept an id, a site, and badges ids', async () => {
    const { stdout, stderr } = await wdTest('badges')
    stderr.should.equal('')
    stdout.should.containEql('Q608')
    stdout.should.containEql('Good article')
    stdout.split('\n').length.should.be.aboveOrEqual(4)
  })
})
