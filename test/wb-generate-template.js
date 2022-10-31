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

  describe('sitelinks', () => {
    it('should preserve badges', async () => {
      const { stdout } = await shellExec('./bin/wb gt Q226646 --props sitelinks.frwiki --format json --instance https://test.wikidata.org')
      JSON.parse(stdout)
      .sitelinks.should.deepEqual({
        frwiki: {
          title: 'Bac à sable',
          badges: [ 'Q608', 'Q609' ]
        }
      })
    })
  })
})
