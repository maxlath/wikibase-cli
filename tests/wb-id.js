import 'should'
import { shellExec } from '#tests/lib/utils'

describe('wb id', () => {
  it('display help', async () => {
    const { stdout } = await shellExec('./bin/wd.js id')
    stdout.should.containEql('Usage:')
  })

  it('should accept a Wikipedia article title', async () => {
    const { stdout } = await shellExec('./bin/wd.js id Cantabria -l en')
    stdout.should.equal('Q3946')
  })

  it('should accept a sitelink URL', async () => {
    const { stdout } = await shellExec('./bin/wd.js id https://fr.wikipedia.org/wiki/The_Ister')
    stdout.should.equal('Q3521413')
  })

  it('should accept a dbpedia URL', async () => {
    const { stdout } = await shellExec('./bin/wd.js id http://fr.dbpedia.org/resource/Eva_Bester')
    stdout.should.equal('Q42886668')
  })
})
