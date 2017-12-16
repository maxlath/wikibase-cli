require('should')
const execa = require('execa')

describe('wd label', function () {
  this.timeout(10000)

  it('should display help', done => {
    execa.shell('./bin/wd label')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('<entity>', done => {
    execa.shell('./bin/wd label Q123456')
    .then(res => {
      res.stdout.should.equal('Friedrichshafen')
      done()
    })
    .catch(done)
  })

  it('<entity> should be tolerant on input', done => {
    execa.shell('./bin/wd label azfzafzafazQ123456fazafazfz')
    .then(res => {
      res.stdout.should.equal('Friedrichshafen')
      done()
    })
    .catch(done)
  })
})
