require('should')
const execa = require('execa')

describe('wb description', function () {
  this.timeout(20000)

  it('should display help', done => {
    execa.shell('./bin/wd description')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('<entity>', done => {
    execa.shell('./bin/wd description Q123456 -l en')
    .then(res => {
      res.stdout.should.equal('Wikimedia disambiguation page')
      done()
    })
    .catch(done)
  })

  it('<entity> should be tolerant on input', done => {
    execa.shell('./bin/wd description  -l en azfzafzafazQ123456fazafazfz')
    .then(res => {
      res.stdout.should.equal('Wikimedia disambiguation page')
      done()
    })
    .catch(done)
  })
})
