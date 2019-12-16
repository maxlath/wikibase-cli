require('should')
const { shellExec } = require('./lib/utils')

describe('wb id', function () {
  this.timeout(20000)

  it('display help', done => {
    shellExec('./bin/wd id')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('should accept a Wikipedia article title', done => {
    shellExec('./bin/wd id Cantabria -l en')
    .then(res => {
      res.stdout.should.equal('Q3946')
      done()
    })
    .catch(done)
  })

  it('should accept a sitelink URL', done => {
    shellExec('./bin/wd id https://fr.wikipedia.org/wiki/The_Ister')
    .then(res => {
      res.stdout.should.equal('Q3521413')
      done()
    })
    .catch(done)
  })
})
