require('should')
const { wdTest } = require('./lib/utils')

describe('batch mode', function () {
  this.timeout(20000)
  it('should take arguments from stdin (add-claim)', async () => {
    const { stdout, stderr } = await wdTest('add-claim --batch < ./test/assets/add_claim_batch')
    const [ res1, res2 ] = stdout.split('\n')
    JSON.parse(res1).claim.id.should.startWith('Q1111')
    JSON.parse(res2).claim.id.should.startWith('Q1111')
    const [ log1, log2, logDone ] = stderr.split('\n')
    log1.trim().should.equal('processing line 1: Q1111 P95180 bar')
    log2.trim().should.equal('processing line 2: [ "Q1111", "P95226", {"time":"1800","precision":7} ]')
    logDone.trim().should.equal('done processing 2 lines: successes=2 errors=0')
  })

  it('should take arguments from stdin (edit-entity)', async () => {
    const { stdout, stderr } = await wdTest('edit-entity --batch < ./test/assets/edit_entity_batch')
    const [ res1, res2 ] = stdout.split('\n')
    JSON.parse(res1).entity.id.should.equal('Q1111')
    JSON.parse(res2).entity.id.should.equal('Q1111')
    const [ log1, log2, logDone ] = stderr.split('\n')
    log1.trim().should.equal('processing line 1: {"id":"Q1111", "claims":{ "P95180": "foo" }}')
    log2.trim().should.equal('processing line 2: {"id":"Q1111", "claims":{ "P95228": 456 }}')
    logDone.trim().should.equal('done processing 2 lines: successes=2 errors=0')
  })

  it('should not exit if requested', async () => {
    const { stdout, stderr } = await wdTest('add-claim --batch --no-exit-on-error < ./test/assets/add_claim_batch_with_error')
    const stderrLines = stderr.split('\n')
    stderrLines.slice(0, 2).should.deepEqual([
      'processing line 1: Q1111 P95228 notaquantity',
      'error triggered by line: "Q1111 P95228 notaquantity": Error: invalid quantity value'
    ])
    stderrLines.slice(-2).should.deepEqual([
      'processing line 2: Q1111 P95228 123 (errors in previous lines: 1)',
      'done processing 2 lines: successes=1 errors=1'
    ])
    const [ res2 ] = stdout.split('\n')
    JSON.parse(res2).claim.id.should.startWith('Q1111')
  })
})
