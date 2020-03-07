require('should')
const { wdTest } = require('./lib/utils')
const editDataJson = require('./assets/edit_data.json')
const editDataJs = require('./assets/edit_data.js')

describe('wb edit-entity', function () {
  this.timeout(20000)

  it('should accept a path to a JSON file', async () => {
    const { stdout } = await wdTest('edit-entity --dry ./test/assets/edit_data.json')
    const data = JSON.parse(stdout)
    data.should.deepEqual(editDataJson)
  })

  it('should accept a path to a JS object file', async () => {
    const { stdout } = await wdTest('edit-entity --dry ./test/assets/edit_data.js')
    const data = JSON.parse(stdout)
    data.should.deepEqual(editDataJs)
  })

  it('should accept a path to a JS function file', async () => {
    const { stdout } = await wdTest('edit-entity --dry ./test/assets/edit_data_function.js Q1 123')
    const data = JSON.parse(stdout)
    data.id.should.equal('Q1')
    data.claims.P95228.should.equal(123)
  })

  it('should take arguments from stdin in batch mode', async () => {
    const { stdout, stderr } = await wdTest('edit-entity --batch < ./test/assets/edit_entity_batch')
    const [ res1, res2 ] = stdout.split('\n')
    JSON.parse(res1).entity.id.should.equal('Q1111')
    JSON.parse(res2).entity.id.should.equal('Q1111')
    const [ log1, log2, logDone ] = stderr.split('\n')
    log1.trim().should.equal('processing line 1: {"id":"Q1111", "claims":{ "P95180": "foo" }}')
    log2.trim().should.equal('processing line 2: {"id":"Q1111", "claims":{ "P95228": 456 }}')
    logDone.trim().should.equal('done processing 2 lines')
  })
})
