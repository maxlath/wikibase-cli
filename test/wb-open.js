require('should')
const { shellExec } = require('./lib/utils')

describe('wb open', function () {
  this.timeout(20000)

  it('should display help', done => {
    shellExec('./bin/wd open')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })
})
