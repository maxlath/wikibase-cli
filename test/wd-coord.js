require('should')
const execa = require('execa')

describe('wd coord', function () {
  this.timeout(10000)

  it('display help', done => {
    execa.shell('./bin/wd claims')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('<id>', done => {
    execa.shell('./bin/wd coord Q90')
    .then(res => {
      res.stdout.should.equal('48.856577777778 2.3518277777778')
      done()
    })
    .catch(done)
  })
})
