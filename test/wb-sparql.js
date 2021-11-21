require('should')
const { shellExec } = require('./lib/utils')

describe('wb sparql', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd sparql')
    stdout.should.containEql('Usage:')
  })

  it('should take a file path', async () => {
    const { stdout } = await shellExec('./bin/wd sparql ./test/assets/query.rq --dry')
    stdout.should.containEql('wdt:P50 wd:Q1345582 .')
  })

  it('should take a JS module path', async () => {
    const { stdout } = await shellExec('./bin/wd sparql ./test/assets/query.js Q1 --dry')
    stdout.should.containEql('wdt:P50 wd:Q1 .')
  })

  it('should take an async JS module path', async () => {
    const { stdout } = await shellExec('./bin/wd sparql ./test/assets/query_async.js Q2 --dry')
    stdout.should.containEql('wdt:P50 wd:Q2 .')
  })

  describe('dry', () => {
    it('should return the generated SPARQL', async () => {
      const { stdout } = await shellExec('./bin/wd sparql ./test/assets/query.rq --dry')
      stdout.should.containEql('SELECT')
    })
  })

  describe('meta data', () => {
    it('should take a JS module path with metadata', async () => {
      const templateModule = require('./assets/query_with_metadata.js')
      templateModule.template.should.be.a.Function()
      templateModule.args.should.be.an.Array()
      templateModule.description.should.be.a.String()
      templateModule.examples.should.be.an.Array()
      const { stdout: stdoutDry } = await shellExec('./bin/wd sparql ./test/assets/query_with_metadata.js Q3 --dry')
      stdoutDry.should.containEql('wdt:P50 wd:Q3 .')
      const { stdout: stdoutHelp } = await shellExec('./bin/wd sparql ./test/assets/query_with_metadata.js --help')
      stdoutHelp.should.containEql('Usage:')
      stdoutHelp.should.containEql('Examples:')
      stdoutHelp.should.containEql('Query items with Gilbert Simondon has author')
    })
  })
})
