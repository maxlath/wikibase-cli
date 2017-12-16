require('should')
const execa = require('execa')

describe('wd claims', function () {
  this.timeout(10000)
  it('should display help', done => {
    execa.shell('./bin/wd sparql')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('should take a file path', done => {
    execa.shell('./bin/wd sparql ./test/assets/query.rq')
    .then(res => {
      res.stdout.split('Q47304').length.should.equal(2)
      done()
    })
    .catch(done)
  })
})
