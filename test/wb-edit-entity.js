require('should')
const { shellExec } = require('./lib/utils')
const editDataJson = require('./assets/edit_data.json')
const editDataJs = require('./assets/edit_data.js')

describe('wb edit-entity', function () {
  this.timeout(20000)

  it('should accept a path to a JSON file', done => {
    shellExec('./bin/wd edit-entity --dry ./test/assets/edit_data.json')
    .then(res => {
      const data = JSON.parse(res.stdout)
      data.should.deepEqual(editDataJson)
      done()
    })
    .catch(done)
  })

  it('should accept a path to a JS object file', done => {
    shellExec('./bin/wd edit-entity --dry ./test/assets/edit_data.js')
    .then(res => {
      const data = JSON.parse(res.stdout)
      data.should.deepEqual(editDataJs)
      done()
    })
    .catch(done)
  })

  it('should accept a path to a JS function file', done => {
    shellExec('./bin/wd edit-entity --dry ./test/assets/edit_data_function.js Q1 123')
    .then(res => {
      const data = JSON.parse(res.stdout)
      data.id.should.equal('Q1')
      data.claims.P1106.should.equal(123)
      done()
    })
    .catch(done)
  })

  it('should take arguments from stdin in batch mode', async () => {
    const { stdout, stderr } = await shellExec('./bin/wd edit-entity --batch < ./test/assets/edit_entity_batch')
    const [ res1, res2 ] = stdout.split('\n')
    JSON.parse(res1).entity.id.should.equal('Q4115189')
    JSON.parse(res2).entity.id.should.equal('Q4115189')
    const [ log1, log2, logDone ] = stderr.split('\n')
    log1.trim().should.equal('processing line 1: {"id":"Q4115189", "claims":{ "P370": "foo" }}')
    log2.trim().should.equal('processing line 2: {"id":"Q4115189", "claims":{ "P1106": 456 }}')
    logDone.trim().should.equal('done processing 2 lines')
  })
})
