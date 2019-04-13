require('should')
const execa = require('execa')

describe('wd lang', () => {
  it('should display help', done => {
    execa.shell('./bin/wd lang')
    .then(res => {
      res.stdout.split('Usage:').length.should.equal(2)
      done()
    })
    .catch(done)
  })

  it('should identify a lang from a wikidata item id', done => {
    execa.shell('./bin/wd lang Q150')
    .then(res => {
      res.stdout.should.equal('fr')
      done()
    })
    .catch(done)
  })

  it('should identify a lang from a language code', done => {
    execa.shell('./bin/wd lang fr')
    .then(res => {
      res.stdout.should.equal('Q150')
      done()
    })
    .catch(done)
  })

  it('should identify a lang from a string', done => {
    execa.shell('./bin/wd lang akan')
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
      execa.shell('./bin/wd lang Q150 --json')
      .then(res => {
        const data = JSON.parse(res.stdout)
        data.code.should.equal('fr')
        data.wd.should.equal('Q150')
        done()
      })
      .catch(done)
    })

    it('should identify a lang from a language code', done => {
      execa.shell('./bin/wd lang fr --json')
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
