require('should')
const { wdTest } = require('./lib/utils')

describe('wb edit-entity', function () {
  this.timeout(20000)

  it('should show the command help menu when called without argument', async () => {
    const { stdout } = await wdTest('create-entity')
    stdout.should.containEql('Usage:')
    stdout.should.containEql('Create a new entity')
  })

  it('should show the help menu for the requested template', async () => {
    const templateModule = require('./assets/create_data_function.js')
    templateModule.should.be.a.Function()
    templateModule.args.should.be.an.Array()
    templateModule.description.should.be.a.String()
    const { stdout } = await wdTest('create-entity --help ./test/assets/create_data_function.js')
    stdout.trim().should.startWith('Create an item with a label and a P95228 statement')
    stdout.should.containEql('Usage:')
  })
})
