require('should')
const execa = require('execa')

describe('wd open', function () {
  this.timeout(10000)

  it('should display help', done => {
    execa.shell('./bin/wd open')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })
})
