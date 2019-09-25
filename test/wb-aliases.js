require('should')
const execa = require('execa')

describe('wb aliases', function () {
  this.timeout(20000)

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
      res.stdout.should.match(/sept/i)
      done()
    })
    .catch(done)
  })

  it('<entity> should be tolerant on input', done => {
    execa.shell('./bin/wd aliases azfzafzafazQ123fazafazfz')
    .then(res => {
      res.stdout.should.match(/sept/i)
      done()
    })
    .catch(done)
  })
})
