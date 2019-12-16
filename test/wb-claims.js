require('should')
const { shellExec } = require('./lib/utils')

describe('wb claims', function () {
  this.timeout(20000)

  it('should display help when requested without argument', done => {
    shellExec('./bin/wd claims')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('should display all entity claims when passed an entity id', done => {
    shellExec('./bin/wd claims Q3521413')
    .then(res => {
      res.stdout.split('film (Q11424)').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('shoud display property claims when passed and entity id and a property id', done => {
    shellExec('./bin/wd claims Q3521413 P31')
    .then(res => {
      res.stdout.should.equal('Q11424')
      done()
    })
    .catch(done)
  })

  it('should return shell-friendly results when possible', done => {
    shellExec('./bin/wd claims Q90 P625')
    .then(res => {
      res.stdout.should.equal('48.856944444444 2.3513888888889')
      done()
    })
    .catch(done)
  })

  it('should filters properties from text', done => {
    const coords = '48.856944444444,2.3513888888889'
    shellExec('./bin/wd claims Q90 coord')
    .then(res => {
      res.stdout.split(coords).length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('should find the GUID of a claim when provided a value', done => {
    shellExec('./bin/wd claims Q2924461 P17 Q30')
    .then(res => {
      res.stdout.should.equal('Q2924461$86A518DA-945F-41B8-871C-8C4FC148AEFA')
      done()
    })
    .catch(done)
  })
})
