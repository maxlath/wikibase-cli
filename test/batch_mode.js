require('should')
const { wdTest } = require('./lib/utils')

describe('batch mode', function () {
  this.timeout(20000)

  it('should take arguments from stdin (add-claim)', async () => {
    const { stdout, stderr } = await wdTest('add-claim --batch < ./test/assets/add_claim_batch')
    const [ res1, res2 ] = stdout.split('\n')
    JSON.parse(res1).claim.id.should.startWith('Q1111')
    JSON.parse(res2).claim.id.should.startWith('Q1111')
    formatProgression(stderr).should.deepEqual([
      'processing line 1: Q1111 P95180 bar',
      'processing line 2: [ "Q1111", "P95226", {"time":"1800","precision":7} ]',
      'done processing 2 lines: successes=2 errors=0'
    ])
  })

  it('should take arguments from stdin (edit-entity)', async () => {
    const { stdout, stderr } = await wdTest('edit-entity --batch --dry < ./test/assets/edit_entity_batch')
    stdout.split('\n').should.deepEqual([
      '{"id":"Q1111","claims":{"P95180":"foo"}}',
      '{"id":"Q1111","claims":{"P95228":456}}'
    ])
    formatProgression(stderr).should.deepEqual([
      'processing line 1: {"id":"Q1111", "claims":{ "P95180": "foo" }}',
      'processing line 2: {"id":"Q1111", "claims":{ "P95228": 456 }}',
      'done processing 2 lines: successes=2 errors=0'
    ])
  })

  it('should take some arguments inline and complete with stdin', async () => {
    const { stdout, stderr } = await wdTest('edit-entity ./test/assets/template.js --batch --dry < ./test/assets/batch_ids')
    stdout.split('\n').should.deepEqual([
      '{"id":"Q210421","aliases":{"fr":"test"}}',
      '{"id":"Q210422","aliases":{"fr":"test"}}',
      '{"id":"Q210423","aliases":{"fr":"test"}}'
    ])
    formatProgression(stderr).should.deepEqual([
      'processing line 1: Q210421',
      'processing line 2: Q210422',
      'processing line 3: Q210423',
      'done processing 3 lines: successes=3 errors=0'
    ])
  })

  it('should not exit if requested', async () => {
    const { stdout, stderr } = await wdTest('add-claim --batch --no-exit-on-error < ./test/assets/add_claim_batch_with_error')
    const stderrLines = formatProgression(stderr)
    stderrLines[0].should.equal('processing line 1: Q1111 P95228 notaquantity')
    // Not testing the whole line at once, as the error output isn't stable between NodeJS versions
    // Identified case: Node v8 gives a differnt outputs than Node v12
    stderrLines[1].should.startWith('error triggered by line: "Q1111 P95228 notaquantity"')
    stderrLines[1].should.containEql('invalid quantity value')
    stderrLines.slice(-2).should.deepEqual([
      'processing line 2: Q1111 P95228 123 (errors in previous lines: 1)',
      'done processing 2 lines: successes=1 errors=1'
    ])
    const [ res2 ] = stdout.split('\n')
    JSON.parse(res2).claim.id.should.startWith('Q1111')
  })
})

const formatProgression = stderr => stderr.split('\n').filter(isntWarningLine)

const isntWarningLine = line => !line.match(/(\[WARNING\]|maxlag: Waiting|retrying in)/)
