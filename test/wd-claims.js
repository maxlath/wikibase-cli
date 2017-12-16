require('should')
const execa = require('execa')

describe('wd claims', function () {
  this.timeout(10000)

  it('should display help when requested without argument', done => {
    execa.shell('./bin/wd claims')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('should display all entity claims when passed an entity id', done => {
    execa.shell('./bin/wd claims Q3521413')
    .then(res => {
      res.stdout.split('film (Q11424)').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('shoud display property claims when passed and entity id and a property id', done => {
    execa.shell('./bin/wd claims Q3521413 P31')
    .then(res => {
      res.stdout.should.equal('Q11424')
      done()
    })
    .catch(done)
  })

  it('should return shell-friendly results when possible', done => {
    execa.shell('./bin/wd claims Q90 P625')
    .then(res => {
      res.stdout.should.equal('48.856577777778 2.3518277777778')
      done()
    })
    .catch(done)
  })

  it('should accepts options before arguments', done => {
    execa.shell('./bin/wd claims -c Q90 P625')
    .then(res => {
      res.stdout.should.equal('48.856577777778 2.3518277777778')
      done()
    })
    .catch(done)
  })

  it('should filters properties from text', done => {
    const coords = '48.856577777778,2.3518277777778'
    execa.shell('./bin/wd claims Q90 coord')
    .then(res => {
      res.stdout.split(coords).length.should.equal(2)
      done()
    })
    .catch(done)
  })
})
