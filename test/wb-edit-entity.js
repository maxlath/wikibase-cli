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
})
