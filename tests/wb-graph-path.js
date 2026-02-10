import 'should'
import { shellExec } from '#tests/lib/utils'

describe('wb graph-path', () => {
  it('should display help', async () => {
    const { stdout } = await shellExec('./bin/wd.js graph-path')
    stdout.should.containEql('Usage:')
  })

  it('should output a graph path', async () => {
    const { stdout } = await shellExec('./bin/wd.js graph-path Q107635454 P279 Q5198304 -e qlever')
    stdout.should.equal('Critical Mass Berlin (Q107635454) → Critical Mass (Q318702) → cycling advocacy (Q5198304)')
  })

  it('should output a graph path when given several possible objects', async () => {
    const { stdout } = await shellExec('./bin/wd.js graph-path Q107635454 P279 Q129342331,Q5198304 -e qlever')
    stdout.should.equal('Critical Mass Berlin (Q107635454) → Critical Mass (Q318702) → cycling advocacy (Q5198304)')
  })
})
