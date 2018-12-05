require('should')
const execa = require('execa')
const { undesiredRes } = require('./lib/utils')

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

  it("should find an entity's label", done => {
    execa.shell('./bin/wd label Q123456')
    .then(res => {
      res.stdout.should.equal('Friedrichshafen')
      done()
    })
    .catch(done)
  })

  it('should not fallback on another language if a language is explicitly specificed', done => {
    execa.shell('./bin/wd label --lang uk Q15726039')
    .then(undesiredRes(done))
    .catch(res => {
      res.stderr.trim().should.equal('no result found')
      done()
    })
    .catch(done)
  })

  it('should be tolerant on input', done => {
    execa.shell('./bin/wd label azfzafzafazQ123456fazafazfz')
    .then(res => {
      res.stdout.should.equal('Friedrichshafen')
      done()
    })
    .catch(done)
  })
})
