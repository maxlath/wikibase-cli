require('should')
const execa = require('execa')

describe('wb search', function () {
  this.timeout(20000)

  it('should display help', done => {
    execa.shell('./bin/wd search')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('should search an entity', done => {
    execa.shell('./bin/wd search september --lang en --limit 1')
    .then(res => {
      res.stdout.should.startWith('Q123')
      done()
    })
    .catch(done)
  })

  it('should search an entity in verbose mode', done => {
    execa.shell('./bin/wd search september --lang en --verbose --limit 1')
    .then(res => {
      res.stdout.should.startWith('id Q123')
      done()
    })
    .catch(done)
  })
})
