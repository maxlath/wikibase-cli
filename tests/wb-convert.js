import 'should'
import { shellExec } from '#tests/lib/utils'

describe('wb convert', () => {
  it('should convert external ids', async () => {
    const { stdout } = await shellExec('./bin/wd.js convert -p P268 -o 11865344k 11932251d')
    const results = JSON.parse(stdout)
    results.should.be.an.Object()
    results['11865344k'][0].should.equal('Q45')
    results['11932251d'][0].should.equal('Q140')
  })

  it('should convert external ids passed on stdin', async () => {
    const { stdout } = await shellExec('echo "11865344k 11932251d" | ./bin/wd.js convert -p P268 -o')
    const results = JSON.parse(stdout)
    results.should.be.an.Object()
    results['11865344k'][0].should.equal('Q45')
    results['11932251d'][0].should.equal('Q140')
  })

  it('should convert Wikidata ids', async () => {
    const { stdout } = await shellExec('./bin/wd.js convert -p P268 -s Q45 Q140')
    const results = JSON.parse(stdout)
    results.should.be.an.Object()
    results.Q45.includes('11865344k').should.be.true()
    results.Q45.includes('119328454').should.be.true()
    results.Q140[0].should.equal('11932251d')
  })

  it('should convert external ids that look like Wikidata ids', async () => {
    const { stdout } = await shellExec('./bin/wd.js convert -p P352 -o Q13131')
    const results = JSON.parse(stdout)
    results.Q13131[0].should.equal('Q21115170')
  })
})
