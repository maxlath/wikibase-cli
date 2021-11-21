require('should')
const { shellExec } = require('./lib/utils')

describe('wb generate-template', () => {
  it('should generate a template from an item id', async () => {
    const { stdout } = await shellExec('./bin/wd gt Q123456 --props labels.de --format json')
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
