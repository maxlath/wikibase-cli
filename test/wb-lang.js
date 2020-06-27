require('should')
const { shellExec } = require('./lib/utils')

describe('wb lang', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd lang')
    stdout.should.containEql('Usage:')
  })

  it('should identify a lang from a wikidata item id', async () => {
    const { stdout } = await shellExec('./bin/wd lang Q150')
    stdout.should.equal('fr')
  })

  it('should identify a lang from a language code', async () => {
    const { stdout } = await shellExec('./bin/wd lang fr')
    stdout.should.equal('Q150')
  })

  it('should identify a lang from a string', async () => {
    const { stdout } = await shellExec('./bin/wd lang akan')
    const [ langCode, wdId, englishLabel, native ] = stdout.split(/\s+/g)
    langCode.should.equal('ak')
    wdId.should.equal('Q28026')
    englishLabel.should.equal('Akan')
    native.should.equal('Akana')
  })

  describe('json', () => {
    it('should identify a lang from a wikidata item id', async () => {
      const { stdout } = await shellExec('./bin/wd lang Q150 --json')
      const data = JSON.parse(stdout)
      data.code.should.equal('fr')
      data.wd.should.equal('Q150')
    })

    it('should identify a lang from a language code', async () => {
      const { stdout } = await shellExec('./bin/wd lang fr --json')
      const data = JSON.parse(stdout)
      data.code.should.equal('fr')
      data.wd.should.equal('Q150')
    })
  })
})
