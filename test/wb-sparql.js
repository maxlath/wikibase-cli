require('should')
const { shellExec } = require('./lib/utils')

describe('wb sparql', function () {
  this.timeout(20000)
  it('should display help', done => {
    shellExec('./bin/wd sparql')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('should take a file path', done => {
    shellExec('./bin/wd sparql ./test/assets/query.rq')
    .then(res => {
      res.stdout.split('Q18120925').length.should.equal(2)
      done()
    })
    .catch(done)
  })
})
