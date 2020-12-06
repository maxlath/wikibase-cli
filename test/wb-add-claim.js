require('should')
const { wdTest } = require('./lib/utils')

describe('wb add-claim', function () {
  this.timeout(20000)

  it('should add a claim', async () => {
    const { stdout, stderr } = await wdTest('add-claim Q1111 P95180 "add-claim test"')
    stderr.should.equal('')
    const res = JSON.parse(stdout)
    res.claim.id.should.startWith('Q1111')
  })
})
