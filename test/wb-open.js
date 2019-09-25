require('should')
const execa = require('execa')

describe('wb open', function () {
  this.timeout(20000)

  it('should display help', done => {
    execa.shell('./bin/wd open')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })
})
