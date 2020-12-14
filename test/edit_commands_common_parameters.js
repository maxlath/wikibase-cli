require('should')
const { wdTest, randomString, shouldNotBeCalled } = require('./lib/utils')

describe('edit commands common parameters', function () {
  this.timeout(20000)

  describe('summary', () => {
    it('should accept a summary', async () => {
      const id = 'Q1111'
      const summary = randomString()
      await wdTest(`set-label ${id} la foo ${randomString()} --summary ${summary}`)
      const lastRev = await getLastRev(id)
      lastRev.comment.should.endWith(summary)
    })
  })

  describe('maxlag', () => {
    // This test works if it reaches its timeout, as wikibase-edit will retry
    it('should accept a maxlag', async () => {
      const id = 'Q1111'
      try {
        await wdTest(`set-label ${id} la ${randomString()} --maxlag -1`).then(shouldNotBeCalled)
      } catch (err) {
        err.stderr.should.containEql('"code":"maxlag"')
        err.stderr.should.containEql('seconds lagged')
      }
    })
  })
})

const getLastRev = async id => {
  const { stdout } = await wdTest(`revisions ${id} --limit 1`)
  const { revisions } = JSON.parse(stdout)
  return revisions[0]
}
