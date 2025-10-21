import 'should'
import { shellExec } from '#tests/lib/utils'

describe('wb open', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd.js open')
    stdout.should.containEql('Usage:')
  })

  it('should find an item url', async () => {
    const { stdout } = await shellExec(`./bin/wd.js open --url 'some text:Q100096: here too'`)
    stdout.should.equal('https://www.wikidata.org/entity/Q100096')
  })

  it('should find a property url', async () => {
    const { stdout } = await shellExec(`./bin/wd.js open --url 'some text:P123: here too'`)
    stdout.should.equal('https://www.wikidata.org/entity/P123')
  })

  it('should find a lexeme url', async () => {
    const { stdout } = await shellExec(`./bin/wd.js open --url 'some text:L123: here too'`)
    stdout.should.equal('https://www.wikidata.org/entity/L123')
  })

  it('should find a form url', async () => {
    const { stdout } = await shellExec(`./bin/wd.js open --url 'some text:L123-F3: here too'`)
    stdout.should.equal('https://www.wikidata.org/entity/L123-F3')
  })

  it('should find a sense url', async () => {
    const { stdout } = await shellExec(`./bin/wd.js open --url 'some text:L123-S143: here too'`)
    stdout.should.equal('https://www.wikidata.org/entity/L123-S143')
  })

  it('should find a media id url', async () => {
    const { stdout } = await shellExec(`./bin/wd.js open --url 'some text:M123: here too'`)
    stdout.should.equal('https://www.wikidata.org/entity/M123')
  })

  it('should find an entity schema url', async () => {
    const { stdout } = await shellExec(`./bin/wd.js open --url 'some text:E123: here too'`)
    stdout.should.equal('https://www.wikidata.org/entity/E123')
  })

  it('should find a statement page url from a GUID', async () => {
    const { stdout } = await shellExec(`./bin/wd.js open --url 'Q100096$15A12A23-76A7-4191-8F74-45999A309423'`)
    stdout.should.equal('https://www.wikidata.org/entity/statement/Q100096-15A12A23-76A7-4191-8F74-45999A309423')
  })

  it('should find a statement page url from a GUID as returned by SPARQL queries', async () => {
    const { stdout } = await shellExec(`./bin/wd.js open --url '  wds:P12729-0E30BCE5-49FF-40F2-B7EC-FBAF0828B103'`)
    stdout.should.equal('https://www.wikidata.org/entity/statement/P12729-0E30BCE5-49FF-40F2-B7EC-FBAF0828B103')
  })

  it('should find a statement page url from a GUID with legacy case', async () => {
    const { stdout } = await shellExec(`./bin/wd.js open --url 'wds:q1059114-107F1AC7-1195-4137-A779-748D633CDA68'`)
    stdout.should.equal('https://www.wikidata.org/entity/statement/q1059114-107F1AC7-1195-4137-A779-748D633CDA68')
  })
})
