require('should')
const execa = require('execa')

describe('wd convert', function () {
  this.timeout(10000)

  it('should convert external ids', done => {
    execa.shell('./bin/wd convert P268 11865344k 11932251d')
    .then(res => {
      const results = JSON.parse(res.stdout)
      results.should.be.an.Object()
      results['11865344k'].should.equal('Q45')
      results['11932251d'].should.equal('Q140')
      done()
    })
    .catch(done)
  })

  it('should convert external ids passed on stdin', done => {
    execa.shell('echo "11865344k 11932251d" | ./bin/wd convert P268')
    .then(res => {
      const results = JSON.parse(res.stdout)
      results.should.be.an.Object()
      results['11865344k'].should.equal('Q45')
      results['11932251d'].should.equal('Q140')
      done()
    })
    .catch(done)
  })
})
