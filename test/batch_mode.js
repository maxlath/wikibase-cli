require('should')
const { wdTest } = require('./lib/utils')

describe('batch mode', () => {
  it('should take arguments from stdin (add-claim)', async () => {
    const { stdout, stderr } = await wdTest('add-claim --batch --dry < ./test/assets/add_claim_batch')
    stdout.split('\n').should.deepEqual([
      '{"id":"Q1111","property":"P95180","value":"bar"}',
      '{"id":"Q1111","property":"P95226","value":{"time":"1800","precision":7}}',
    ])
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

  it('should accept quoted arguments', async () => {
    const { stdout } = await wdTest('update-claim --batch --dry < ./test/assets/update_claim_batch')
    JSON.parse(stdout).newValue.should.equal("Thuja occidentalis 'Smaragd'")
  })

  it('should not exit if requested', async () => {
    const { stderr } = await wdTest('add-claim --batch --no-exit-on-error < ./test/assets/add_claim_batch_with_error')
    const stderrLines = formatProgression(stderr)
    stderrLines.filter(line => line.startsWith('processing line 1')).length.should.equal(1)
    stderrLines.slice(-1)[0].should.equal('done processing 2 lines: successes=0 errors=2')
  })
})

const formatProgression = stderr => stderr.split('\n').filter(isntWarningLine)

const isntWarningLine = line => !line.match(/(\[WARNING\]|maxlag: Waiting|retrying in)/)
