require('should')
const execa = require('execa')

describe('general', function () {
  this.timeout(10000)

  // This test may fail if your local network messes with the request
  // Known case: public hotspot
  it('should allow to customize the instance', done => {
    execa.shell('./bin/wd label Q123456 --instance https://wikiyou.lala')
    .catch(err => {
      err.stderr.match(/getaddrinfo ENOTFOUND wikiyou\.lala/).should.be.ok()
      done()
    })
  })

  // Addressed by https://github.com/maxlath/commander.js/commit/1297ae6
  it('should accepts options before arguments', done => {
    execa.shell('./bin/wd claims -c Q90 P625')
    .then(res => {
      res.stdout.should.equal('48.856577777778 2.3518277777778')
      done()
    })
    .catch(done)
  })
})
