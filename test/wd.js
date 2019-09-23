require('should')
const execa = require('execa')

describe('wd', function () {
  this.timeout(20000)

  it('should display general help', done => {
    execa.shell('./bin/wd')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('should log an error and display help when called with an unknown command', done => {
    execa.shell('./bin/wd nop')
    .then(res => {
      res.stderr.should.equal('unknown command')
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })
})
