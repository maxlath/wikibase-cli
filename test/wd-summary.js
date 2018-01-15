require('should')
const execa = require('execa')
const Q123456EnglishSummary = `id Q123456
Label Friedrichshafen
Description Wikimedia disambiguation page
instance of (P31): Wikimedia disambiguation page (Q4167410)`

describe('wd summary', function () {
  this.timeout(10000)
  it('should display help', done => {
    execa.shell('./bin/wd summary')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('<entity>', done => {
    execa.shell('./bin/wd summary Q123456 -l en')
    .then(res => {
      res.stdout.should.equal(Q123456EnglishSummary)
      done()
    })
    .catch(done)
  })

  it('<entity> should be tolerant on input', done => {
    execa.shell('./bin/wd summary -l en azfzafzafazQ123456fazafazfz')
    .then(res => {
      res.stdout.should.equal(Q123456EnglishSummary)
      done()
    })
    .catch(done)
  })
})
