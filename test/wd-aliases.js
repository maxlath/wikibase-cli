const should = require('should')
const execa = require('execa')

describe('wd aliases', function () {
  this.timeout(10000)

  it('should display help', done => {
    execa.shell('./bin/wd aliases')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('<entity>', done => {
    execa.shell('./bin/wd aliases Q123')
    .then(res => {
      should(res.stdout.split('Sept').length > 1).be.true()
      done()
    })
    .catch(done)
  })

  it('<entity> should be tolerant on input', done => {
    execa.shell('./bin/wd aliases azfzafzafazQ123fazafazfz')
    .then(res => {
      should(res.stdout.split('Sept').length > 1).be.true()
      done()
    })
    .catch(done)
  })
})
