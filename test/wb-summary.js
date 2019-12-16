require('should')
const { shellExec } = require('./lib/utils')
const Q123456EnglishSummary = `id Q123456
Label Friedrichshafen
Description Wikimedia disambiguation page
instance of (P31): Wikimedia disambiguation page (Q4167410)`

describe('wb summary', function () {
  this.timeout(20000)
  it('should display help', done => {
    shellExec('./bin/wd summary')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('<entity>', done => {
    shellExec('./bin/wd summary Q123456 -l en')
    .then(res => {
      res.stdout.should.equal(Q123456EnglishSummary)
      done()
    })
    .catch(done)
  })

  it('<entity> should be tolerant on input', done => {
    shellExec('./bin/wd summary -l en azfzafzafazQ123456fazafazfz')
    .then(res => {
      res.stdout.should.equal(Q123456EnglishSummary)
      done()
    })
    .catch(done)
  })
})
