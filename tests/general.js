import 'should'
import { shellExec } from '#tests/lib/utils'

describe('general', () => {
  // This test may fail if your local network messes with the request
  // Known case: public hotspot
  it('should allow to customize the instance', async () => {
    const { stdout } = await shellExec('./bin/wb.js label Item:Q1 --instance https://wikibase.world/w/api.php')
    stdout.should.equal('Wikidata')
  })

  // Addressed by https://github.com/maxlath/commander.js/commit/1297ae6
  it('should accept options before arguments', async () => {
    const { stdout } = await shellExec('./bin/wd.js claims -c Q12569 P2586')
    stdout.should.equal('42')
  })

  describe('dry mode', () => {
    it('should not require credentials', async () => {
      const { stdout } = await shellExec('./bin/wb.js add-claim Q1 P1 123 --instance http://fake.instance --dry')
      const { section, action, args } = JSON.parse(stdout)
      section.should.equal('claim')
      action.should.equal('create')
      args.should.deepEqual([
        { id: 'Q1', property: 'P1', value: '123' },
      ])
    })
  })
})
