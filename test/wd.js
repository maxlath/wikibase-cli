require('should')
const { shellExec } = require('./lib/utils')

describe('wd', function () {
  this.timeout(20000)

  it('should display general help', done => {
    shellExec('./bin/wd')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('should log an error and display help when called with an unknown command', done => {
    shellExec('./bin/wd nop')
    .then(res => {
      res.stderr.should.equal('unknown command')
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })
})
