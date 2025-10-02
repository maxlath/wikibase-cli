import 'should'
import { shellExec } from '#test/lib/utils'

describe('wb search', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd.js search')
    stdout.should.containEql('Usage:')
  })

  it('should find an item', async () => {
    const { stdout } = await shellExec('./bin/wd.js search "gilbert simondon" --lang en --limit 1')
    stdout.should.startWith('Q1345582')
  })

  it('should find an item in verbose mode', async () => {
    const { stdout } = await shellExec('./bin/wd.js search "gilbert simondon" --lang en --verbose --limit 1')
    stdout.should.startWith('id Q1345582')
  })

  it('should find a property', async () => {
    const { stdout } = await shellExec('./bin/wd.js search "electron configuration" --type property')
    stdout.should.startWith('P8000')
  })

  it('should find a property, short version', async () => {
    const { stdout } = await shellExec('./bin/wd.js search "electron configuration" -t p')
    stdout.should.startWith('P8000')
  })

  it('should find a lexeme', async () => {
    const { stdout } = await shellExec('./bin/wd.js search "maison" --type lexeme')
    stdout.should.startWith('L525')
  })

  it('should find a lexeme, short version', async () => {
    const { stdout } = await shellExec('./bin/wd.js search "maison" -t l')
    stdout.should.startWith('L525')
  })

  it('should find a form', async () => {
    const { stdout } = await shellExec('./bin/wd.js search "maison" --type form')
    stdout.should.startWith('L525-F1')
  })

  it('should find a form, short version', async () => {
    const { stdout } = await shellExec('./bin/wd.js search "maison" -t f')
    stdout.should.startWith('L525-F1')
  })

  // Sense search doesn't seem to return results at the moment
  xit('should find a sense', async () => {
    const { stdout } = await shellExec('./bin/wd.js search "édifice destiné à l\'habitation" --type sense')
    stdout.should.startWith('L525-S1')
  })

  xit('should find a sense, short version', async () => {
    const { stdout } = await shellExec('./bin/wd.js search "édifice destiné à l\'habitation" -t s')
    stdout.should.startWith('L525-S1')
  })
})
