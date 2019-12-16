require('should')
const { shellExec } = require('./lib/utils')

describe('wb lang', () => {
  it('should display help', done => {
    shellExec('./bin/wd lang')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('should identify a lang from a wikidata item id', done => {
    shellExec('./bin/wd lang Q150')
    .then(res => {
      res.stdout.should.equal('fr')
      done()
    })
    .catch(done)
  })

  it('should identify a lang from a language code', done => {
    shellExec('./bin/wd lang fr')
    .then(res => {
      res.stdout.should.equal('Q150')
      done()
    })
    .catch(done)
  })

  it('should identify a lang from a string', done => {
    shellExec('./bin/wd lang akan')
    .then(res => {
      const [ langCode, wdId, englishLabel, native ] = res.stdout.split(/\s+/g)
      langCode.should.equal('ak')
      wdId.should.equal('Q28026')
      englishLabel.should.equal('Akan')
      native.should.equal('Akana')
      done()
    })
    .catch(done)
  })

  describe('json', () => {
    it('should identify a lang from a wikidata item id', done => {
      shellExec('./bin/wd lang Q150 --json')
      .then(res => {
        const data = JSON.parse(res.stdout)
        data.code.should.equal('fr')
        data.wd.should.equal('Q150')
        done()
      })
      .catch(done)
    })

    it('should identify a lang from a language code', done => {
      shellExec('./bin/wd lang fr --json')
      .then(res => {
        const data = JSON.parse(res.stdout)
        data.code.should.equal('fr')
        data.wd.should.equal('Q150')
        done()
      })
      .catch(done)
    })
  })
})
