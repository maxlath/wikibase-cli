require('should')
const { shellExec } = require('./lib/utils')

describe('wb search', function () {
  this.timeout(20000)

  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd search')
    stdout.split('Usage:').length.should.equal(2)
  })

  it('should find an item', async () => {
    const { stdout } = await shellExec('./bin/wd search september --lang en --limit 1')
    stdout.should.startWith('Q123')
  })

  it('should find an item in verbose mode', async () => {
    const { stdout } = await shellExec('./bin/wd search september --lang en --verbose --limit 1')
    stdout.should.startWith('id Q123')
  })

  it('should find a property', async () => {
    const { stdout } = await shellExec('./bin/wd search "electron configuration" --type property')
    stdout.should.startWith('P8000')
  })

  it('should find a property, short version', async () => {
    const { stdout } = await shellExec('./bin/wd search "electron configuration" -t p')
    stdout.should.startWith('P8000')
  })

  it('should find a lexeme', async () => {
    const { stdout } = await shellExec('./bin/wd search "maison" --type lexeme')
    stdout.should.startWith('L525')
  })

  it('should find a lexeme, short version', async () => {
    const { stdout } = await shellExec('./bin/wd search "maison" -t l')
    stdout.should.startWith('L525')
  })

  it('should find a form', async () => {
    const { stdout } = await shellExec('./bin/wd search "maison" --type form')
    stdout.should.startWith('L525-F1')
  })

  it('should find a form, short version', async () => {
    const { stdout } = await shellExec('./bin/wd search "maison" -t f')
    stdout.should.startWith('L525-F1')
  })

  // Sense search doesn't seem to return results at the moment
  xit('should find a sense', async () => {
    const { stdout } = await shellExec(`./bin/wd search "édifice destiné à l'habitation" --type sense`)
    stdout.should.startWith('L525-S1')
  })

  xit('should find a sense, short version', async () => {
    const { stdout } = await shellExec(`./bin/wd search "édifice destiné à l'habitation" -t s`)
    stdout.should.startWith('L525-S1')
  })
})
