require('should')
const { wdTest } = require('./lib/utils')

describe('wb edit-entity', function () {
  this.timeout(20000)

  it('should add a claim', async () => {
    const { stdout, stderr } = await wdTest('add-claim Q1111 P95180 "add-claim test"')
    stderr.should.equal('')
    const res = JSON.parse(stdout)
    res.claim.id.should.startWith('Q1111')
  })

  it('should take arguments from stdin in batch mode', async () => {
    const { stdout, stderr } = await wdTest('add-claim --batch < ./test/assets/add_claim_batch')
    const [ res1, res2 ] = stdout.split('\n')
    JSON.parse(res1).claim.id.should.startWith('Q1111')
    JSON.parse(res2).claim.id.should.startWith('Q1111')
    const [ log1, log2, logDone ] = stderr.split('\n')
    log1.trim().should.equal('processing line 1: Q1111 P95180 bar')
    log2.trim().should.equal('processing line 2: Q1111 P95228 789')
    logDone.trim().should.equal('done processing 2 lines')
  })
})
