import 'should'
import { shellExec } from '#test/lib/utils'

const Q24835EnglishSummaryStart = `id Q24835
Label Jastrząb
Description Wikimedia disambiguation page
instance of (P31): Wikimedia disambiguation page (Q4167410)`

describe('wb summary', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd.js summary')
    stdout.should.containEql('Usage:')
  })

  it('<entity>', async () => {
    const { stdout } = await shellExec('./bin/wd.js summary Q24835 -l en')
    stdout.should.startWith(Q24835EnglishSummaryStart)
  })

  it('<entity> should be tolerant on input', async () => {
    const { stdout } = await shellExec('./bin/wd.js summary -l en azfzafzafazQ24835fazafazfz')
    stdout.should.startWith(Q24835EnglishSummaryStart)
  })
})
