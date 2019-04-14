require('should')
const execa = require('execa')
const editDataJson = require('./assets/edit_data.json')
const editDataJs = require('./assets/edit_data.js')

describe('wd aliases', function () {
  this.timeout(10000)

  it('should accept a path to a JSON file', done => {
    execa.shell('./bin/wd edit-item  --dry ./test/assets/edit_data.json')
    .then(res => {
      const data = JSON.parse(res.stdout)
      data.should.deepEqual(editDataJson)
      done()
    })
    .catch(done)
  })

  it('should accept a path to a JS object file', done => {
    execa.shell('./bin/wd edit-item  --dry ./test/assets/edit_data.js')
    .then(res => {
      const data = JSON.parse(res.stdout)
      data.should.deepEqual(editDataJs)
      done()
    })
    .catch(done)
  })

  it('should accept a path to a JS function file', done => {
    execa.shell('./bin/wd edit-item --dry ./test/assets/edit_data_function.js Q1 123')
    .then(res => {
      const data = JSON.parse(res.stdout)
      data.id.should.equal('Q1')
      data.claims.P1106.should.equal(123)
      done()
    })
    .catch(done)
  })
})
