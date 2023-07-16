import 'should'
import { shellExec } from '#test/lib/utils'

const Q123456EnglishSummary = `id Q123456
Label Friedrichshafen
Description Wikimedia disambiguation page
instance of (P31): Wikimedia disambiguation page (Q4167410)`

describe('wb summary', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd.js summary')
    stdout.should.containEql('Usage:')
  })

  it('<entity>', async () => {
    const { stdout } = await shellExec('./bin/wd.js summary Q123456 -l en')
    stdout.should.startWith(Q123456EnglishSummary)
  })

  it('<entity> should be tolerant on input', async () => {
    const { stdout } = await shellExec('./bin/wd.js summary -l en azfzafzafazQ123456fazafazfz')
    stdout.should.startWith(Q123456EnglishSummary)
  })
})
