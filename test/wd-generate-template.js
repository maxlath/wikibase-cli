require('should')
const execa = require('execa')

describe('wd generate-template', function () {
  this.timeout(20000)

  it('should generate a template from an item id', done => {
    execa.shell('./bin/wd gt Q123456 -p labels.de')
    .then(res => {
      JSON.parse(res.stdout)
      .should.deepEqual({ id: 'Q123456', labels: { de: 'Friedrichshafen' } })
      done()
    })
    .catch(done)
  })
})
