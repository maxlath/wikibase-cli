import 'should'
import { wdTest } from '#tests/lib/utils'

describe('wb create-entity', () => {
  it('should show the command help menu when called without argument', async () => {
    const { stdout } = await wdTest('create-entity')
    stdout.should.containEql('Usage:')
    stdout.should.containEql('Create a new entity')
  })

  it('should show the help menu for the requested template', async () => {
    const { default: templateModule } = await import('./assets/create_data_function.cjs')
    templateModule.should.be.a.Function()
    templateModule.args.should.be.an.Array()
    templateModule.description.should.be.a.String()
    const { stdout } = await wdTest('create-entity --help ./tests/assets/create_data_function.cjs')
    stdout.should.containEql('Create an item with a label and a P95228 statement')
    stdout.should.containEql('Usage:')
  })
})
