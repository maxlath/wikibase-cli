require('should')
const { shellExec } = require('./lib/utils')

describe('wb generate-template', function () {
  this.timeout(20000)

  it('should generate a template from an item id', async () => {
    const { stdout } = await shellExec('./bin/wd gt Q123456 -p labels.de')
    JSON.parse(stdout)
    .should.deepEqual({
      id: 'Q123456',
      type: 'item',
      labels: {
        de: 'Friedrichshafen'
      }
    })
  })
})
