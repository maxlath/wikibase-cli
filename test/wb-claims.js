require('should')
const { shellExec } = require('./lib/utils')

describe('wb claims', function () {
  this.timeout(20000)

  it('should display help when requested without argument', async () => {
    const { stdout } = await shellExec('./bin/wd claims')
    stdout.should.containEql('Usage:')
  })

  it('should display all entity claims when passed an entity id', async () => {
    const { stdout } = await shellExec('./bin/wd claims Q3521413')
    stdout.should.containEql('film (Q11424)')
  })

  it('shoud display property claims when passed and entity id and a property id', async () => {
    const { stdout } = await shellExec('./bin/wd claims Q3521413 P31')
    stdout.should.equal('Q11424')
  })

  it('should filters properties from text', async () => {
    const coords = '48.856944444444,2.3513888888889'
    const { stdout } = await shellExec('./bin/wd claims Q90 coord')
    stdout.should.containEql(coords)
  })

  it('should find the GUID of a claim when provided a value', async () => {
    const { stdout } = await shellExec('./bin/wd claims Q2924461 P17 Q30')
    stdout.should.equal('Q2924461$86A518DA-945F-41B8-871C-8C4FC148AEFA')
  })
})
