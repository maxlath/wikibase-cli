require('should')
const execa = require('execa')

describe('general', function () {
  this.timeout(10000)

  it('should allow to customize the instance', done => {
    execa.shell('./bin/wd label Q123456 --instance https://wikiyou.lala')
    .catch(err => {
      err.stderr.match(/getaddrinfo ENOTFOUND wikiyou\.lala/).should.be.ok()
      done()
    })
  })
})
