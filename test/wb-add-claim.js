require('should')
const { shellExec } = require('./lib/utils')

describe('wb edit-entity', function () {
  this.timeout(20000)

  it('should add a claim', async () => {
    const { stdout, stderr } = await shellExec('./bin/wd add-claim Q4115189 P370 "add-claim test"')
    stderr.should.equal('')
    const res = JSON.parse(stdout)
    res.claim.id.should.startWith('Q4115189')
  })

  it('should take arguments from stdin in batch mode', async () => {
    const { stdout, stderr } = await shellExec('./bin/wd add-claim --batch < ./test/assets/add_claim_batch')
    const [ res1, res2 ] = stdout.split('\n')
    JSON.parse(res1).claim.id.should.startWith('Q4115189')
    JSON.parse(res2).claim.id.should.startWith('Q4115189')
    const [ log1, log2, logDone ] = stderr.split('\n')
    log1.trim().should.equal('processing line 1: Q4115189 P370 bar')
    log2.trim().should.equal('processing line 2: Q4115189 P1106 789')
    logDone.trim().should.equal('done processing 2 lines')
  })
})
