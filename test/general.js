require('should')
const { shellExec } = require('./lib/utils')

describe('general', function () {
  this.timeout(20000)

  // This test may fail if your local network messes with the request
  // Known case: public hotspot
  it('should allow to customize the instance', async () => {
    const { stdout } = await shellExec('./bin/wb label Item:Q11 --instance https://wikibase-registry.wmflabs.org/w/api.php')
    stdout.should.equal('TransforMap Base')
  })

  // Addressed by https://github.com/maxlath/commander.js/commit/1297ae6
  it('should accept options before arguments', async () => {
    const { stdout } = await shellExec('./bin/wd claims -c Q12569 P2586')
    stdout.should.equal('42')
  })

  describe('dry mode', () => {
    it('should not require credentials', async () => {
      const { stdout } = await shellExec('./bin/wb add-claim Q1 P1 123 --instance http://fake.instance --dry')
      JSON.parse(stdout).should.deepEqual({ id: 'Q1', property: 'P1', value: '123' })
    })
  })
})
