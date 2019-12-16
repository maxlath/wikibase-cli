require('should')
const { shellExec } = require('./lib/utils')
const { undesiredRes } = require('./lib/utils')

describe('wb label', function () {
  this.timeout(20000)

  it('should display help', done => {
    shellExec('./bin/wd label')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it("should find an entity's label", done => {
    shellExec('./bin/wd label Q123456')
    .then(res => {
      res.stdout.should.equal('Friedrichshafen')
      done()
    })
    .catch(done)
  })

  it('should not fallback on another language if a language is explicitly specificed', done => {
    shellExec('./bin/wd label --lang uk Q15726039')
    .then(undesiredRes(done))
    .catch(res => {
      res.stderr.trim().should.equal('no result found')
      done()
    })
    .catch(done)
  })

  it('should be tolerant on input', done => {
    shellExec('./bin/wd label azfzafzafazQ123456fazafazfz')
    .then(res => {
      res.stdout.should.equal('Friedrichshafen')
      done()
    })
    .catch(done)
  })
})
