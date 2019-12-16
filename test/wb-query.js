require('should')
const { shellExec } = require('./lib/utils')

describe('wb query', function () {
  this.timeout(20000)

  it('should display help', done => {
    shellExec('./bin/wd query')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('-p [prop] -o [obj] -t [limit]', done => {
    shellExec('./bin/wd query -p P50 -o Q1345582')
    .then(res => {
      res.stdout.split(' ').includes('Q18120925').should.be.true()
      done()
    })
    .catch(done)
  })

  it('should work for URL values', done => {
    shellExec("./bin/wd query -p P973 -o '<https://www.fileformat.info/format/gif/egff.htm>'")
    .then(res => {
      res.stdout.split(' ').includes('Q2192').should.be.true()
      done()
    })
    .catch(done)
  })
})
