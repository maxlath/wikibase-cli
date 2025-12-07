import 'should'
import { shellExec } from '#tests/lib/utils'

describe('wb sparql', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd.js sparql')
    stdout.should.containEql('Usage:')
  })

  it('should take a file path', async () => {
    const { stdout } = await shellExec('./bin/wd.js sparql ./tests/assets/query.rq --dry')
    stdout.should.containEql('wdt:P50 wd:Q1345582 .')
  })

  it('should take a JS module path', async () => {
    const { stdout } = await shellExec('./bin/wd.js sparql ./tests/assets/query.js Q1 --dry')
    stdout.should.containEql('wdt:P50 wd:Q1 .')
  })

  it('should take an async JS module path', async () => {
    const { stdout } = await shellExec('./bin/wd.js sparql ./tests/assets/query_async.js Q2 --dry')
    stdout.should.containEql('wdt:P50 wd:Q2 .')
  })

  it('should take a JS module path and a function name', async () => {
    const { stdout } = await shellExec('./bin/wd.js sparql ./tests/assets/query.js someOtherQuery Q1 --dry')
    stdout.should.containEql('wdt:P110 wd:Q1 .')
  })

  describe('dry', () => {
    it('should return the generated SPARQL', async () => {
      const { stdout } = await shellExec('./bin/wd.js sparql ./tests/assets/query.rq --dry')
      stdout.should.containEql('SELECT')
    })
  })

  describe('meta data', () => {
    it('should take a JS module path with metadata', async () => {
      const { default: templateModule } = await import('./assets/query_with_metadata.js')
      templateModule.template.should.be.a.Function()
      templateModule.args.should.be.an.Array()
      templateModule.description.should.be.a.String()
      templateModule.examples.should.be.an.Array()
      const { stdout: stdoutDry } = await shellExec('./bin/wd.js sparql ./tests/assets/query_with_metadata.js Q3 --dry')
      stdoutDry.should.containEql('wdt:P50 wd:Q3 .')
      const { stdout: stdoutHelp } = await shellExec('./bin/wd.js sparql ./tests/assets/query_with_metadata.js --help')
      stdoutHelp.should.containEql('Usage:')
      stdoutHelp.should.containEql('Examples:')
      stdoutHelp.should.containEql('Query items with Gilbert Simondon has author')
    })
  })

  describe('log response header', () => {
    it('should log the requested response headers', async () => {
      const { stdout, stderr } = await shellExec('./bin/wd.js sparql ./tests/assets/query.rq --log-response-headers x-served-by')
      stdout.should.containEql('Q22117440')
      const reqData = JSON.parse(stderr)
      const { headers } = reqData.response
      headers['x-served-by'][0].should.startWith('wdqs')
    })
  })

  describe('csv', () => {
    it('should return csv format results', async () => {
      const { stdout, stderr } = await shellExec('./bin/wd.js sparql ./tests/assets/query.js Q46409471 --format csv')
      stdout.should.equal('subject\nhttp://www.wikidata.org/entity/Q52260106\nhttp://www.wikidata.org/entity/Q124857319')
      stderr.should.equal('')
    })
  })

  describe('engine', () => {
    it('should infer the engine from the sparql endpoint', async () => {
      const { stdout, stderr } = await shellExec('./bin/wb.js sparql ./tests/assets/query.js Q46409471 --format csv --sparql-endpoint https://qlever.dev/wikidata')
      stdout.should.startWith('subject\n')
      const normalizedResults = stdout.split('\n').slice(1).sort().join('\n')
      normalizedResults.should.equal('http://www.wikidata.org/entity/Q124857319\nhttp://www.wikidata.org/entity/Q52260106')
      stderr.should.equal('')
    })
  })
})
