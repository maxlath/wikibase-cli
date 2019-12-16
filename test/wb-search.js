require('should')
const { shellExec } = require('./lib/utils')

describe('wb search', function () {
  this.timeout(20000)

  it('should display help', done => {
    shellExec('./bin/wd search')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('should search an entity', done => {
    shellExec('./bin/wd search september --lang en --limit 1')
    .then(res => {
      res.stdout.should.startWith('Q123')
      done()
    })
    .catch(done)
  })

  it('should search an entity in verbose mode', done => {
    shellExec('./bin/wd search september --lang en --verbose --limit 1')
    .then(res => {
      res.stdout.should.startWith('id Q123')
      done()
    })
    .catch(done)
  })
})
