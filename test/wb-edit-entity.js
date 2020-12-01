require('should')
const { wdTest } = require('./lib/utils')
const editDataJson = require('./assets/edit_data.json')
const editDataJs = require('./assets/edit_data.js')

describe('wb edit-entity', function () {
  this.timeout(20000)

  it('should accept a path to a JSON file', async () => {
    const { stdout } = await wdTest('edit-entity --dry ./test/assets/edit_data.json')
    const data = JSON.parse(stdout)
    data.should.deepEqual(editDataJson)
  })

  it('should accept a path to a JS object file', async () => {
    const { stdout } = await wdTest('edit-entity --dry ./test/assets/edit_data.js')
    const data = JSON.parse(stdout)
    data.should.deepEqual(editDataJs)
  })

  it('should accept a path to a JS function file', async () => {
    const { stdout } = await wdTest('edit-entity --dry ./test/assets/edit_data_function.js Q1 123')
    const data = JSON.parse(stdout)
    data.id.should.equal('Q1')
    data.claims.P95228.value.should.equal(123)
  })

  it('should show the command help menu when called without argument', async () => {
    const { stdout } = await wdTest('edit-entity')
    stdout.should.containEql('Usage:')
    stdout.should.containEql('Edit an existing entity')
  })

  describe('meta data', () => {
    it('should support exporting an object with a template function and metadata', async () => {
      const templateModule = require('./assets/edit_data_function.js')
      templateModule.template.should.be.a.Function()
      templateModule.args.should.be.an.Array()
      templateModule.description.should.be.a.String()
      templateModule.examples.should.be.an.Array()
      const { stdout } = await wdTest('edit-entity --help ./test/assets/edit_data_function.js')
      stdout.trim().should.startWith('Add a P95228 statement')
      stdout.should.containEql('Usage:')
      const { stdout: dryStdout } = await wdTest('edit-entity --dry ./test/assets/edit_data_function.js Q1 123')
      JSON.parse(dryStdout).id.should.equal('Q1')
    })

    it('should support adding metadata to the template function when main module export', async () => {
      const templateModule = require('./assets/edit_data_function_deprecated.js')
      templateModule.should.be.a.Function()
      templateModule.args.should.be.an.Array()
      templateModule.description.should.be.a.String()
      templateModule.examples.should.be.an.Array()
      const { stdout } = await wdTest('edit-entity --help ./test/assets/edit_data_function_deprecated.js')
      stdout.trim().should.startWith('Add a P95228 statement')
      stdout.should.containEql('Usage:')
      const { stdout: dryStdout } = await wdTest('edit-entity --dry ./test/assets/edit_data_function_deprecated.js Q1 123')
      JSON.parse(dryStdout).id.should.equal('Q1')
    })
  })
})
