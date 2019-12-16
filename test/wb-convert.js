require('should')
const { shellExec } = require('./lib/utils')

describe('wb convert', function () {
  this.timeout(20000)

  it('should convert external ids', done => {
    shellExec('./bin/wd convert P268 11865344k 11932251d')
    .then(res => {
      const results = JSON.parse(res.stdout)
      results.should.be.an.Object()
      results['11865344k'][0].should.equal('Q45')
      results['11932251d'][0].should.equal('Q140')
      done()
    })
    .catch(done)
  })

  it('should convert external ids passed on stdin', done => {
    shellExec('echo "11865344k 11932251d" | ./bin/wd convert P268')
    .then(res => {
      const results = JSON.parse(res.stdout)
      results.should.be.an.Object()
      results['11865344k'][0].should.equal('Q45')
      results['11932251d'][0].should.equal('Q140')
      done()
    })
    .catch(done)
  })

  it('should convert Wikidata ids', done => {
    shellExec('./bin/wd convert P268 Q45 Q140')
    .then(res => {
      const results = JSON.parse(res.stdout)
      results.should.be.an.Object()
      results.Q45.includes('11865344k').should.be.true()
      results.Q45.includes('119328454').should.be.true()
      results.Q140[0].should.equal('11932251d')
      done()
    })
    .catch(done)
  })
})
