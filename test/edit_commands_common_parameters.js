require('should')
const { wdTest, randomString, shouldNotBeCalled } = require('./lib/utils')

describe('edit commands common parameters', () => {
  describe('summary', () => {
    it('should accept a summary', async () => {
      const id = 'Q1111'
      const summary = randomString()
      await wdTest(`set-label ${id} la foo ${randomString()} --summary ${summary}`)
      const lastRev = await getLastRev(id)
      lastRev.comment.should.endWith(summary)
    })

    it('should accept a summary in an edit object', async () => {
      const id = 'Q1111'
      const summary = randomString()
      await wdTest(`edit-entity '{"id":"${id}","labels":{"la":"${randomString()}"},"summary":"${summary}"}'`)
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

  describe('baserevid', () => {
    it('should accept a baserevid', async () => {
      const id = 'Q1111'
      await wdTest(`set-label ${id} la ${randomString()} --baserevid 1`)
      .then(shouldNotBeCalled)
      .catch(err => {
        err.stderr.should.containEql('nosuchrevid')
      })
    })

    it('should accept a baserevid in an edit object', async () => {
      const id = 'Q1111'
      const editObj = `{"id":"${id}","labels":{"la":"${randomString()}"},"baserevid":1}`
      await wdTest(`edit-entity '${editObj}'`)
      .then(shouldNotBeCalled)
      .catch(err => {
        err.stderr.should.containEql('nosuchrevid')
      })
    })
  })
})

const getLastRev = async id => {
  const { stdout } = await wdTest(`revisions ${id} --limit 1`)
  const { revisions } = JSON.parse(stdout)
  return revisions[0]
}
