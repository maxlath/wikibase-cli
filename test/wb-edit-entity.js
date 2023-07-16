import 'should'
import { resolve } from 'node:path'
import { getDirname } from '#lib/fs'
import { readJsonFile } from '#lib/json'
import { wdTest } from '#test/lib/utils'
import editDataJs from './assets/edit_data.js'

const dirname = getDirname(import.meta.url)
const editDataJson = readJsonFile(resolve(dirname, './assets/edit_data.json'))

describe('wb edit-entity', () => {
  it('should accept a path to a JSON file', async () => {
    const { stdout } = await wdTest('edit-entity --dry ./test/assets/edit_data.json')
    const data = JSON.parse(stdout).args[0]
    data.should.deepEqual(editDataJson)
  })

  it('should accept a path to a JS object file', async () => {
    const { stdout } = await wdTest('edit-entity --dry ./test/assets/edit_data.js')
    const data = JSON.parse(stdout).args[0]
    data.should.deepEqual(editDataJs)
  })

  it('should accept a path to a JS function file', async () => {
    const { stdout } = await wdTest('edit-entity --dry ./test/assets/edit_data_function.cjs Q1 123')
    const data = JSON.parse(stdout).args[0]
    data.id.should.equal('Q1')
    data.claims.P95228.value.should.equal(123)
  })

  it('should show the command help menu when called without argument', async () => {
    const { stdout } = await wdTest('edit-entity')
    stdout.should.containEql('Usage:')
    stdout.should.containEql('Edit an existing entity')
  })

  it('should accept an array of edit objects', async () => {
    const { stdout } = await wdTest('edit-entity ./test/assets/multi_edit_data.js --maxlag 100')
    const [ line1, line2 ] = stdout.split('\n')
    JSON.parse(line1).entity.id.should.equal('Q1112')
    JSON.parse(line1).success.should.equal(1)
    JSON.parse(line2).entity.id.should.equal('Q1113')
    JSON.parse(line2).success.should.equal(1)
  })

  it('should not log anything when the template returns undefined', async () => {
    const { stdout, stderr } = await wdTest('edit-entity --dry ./test/assets/template_returns_undefined.js Q1')
    stdout.should.equal('')
    stderr.should.equal('')
  })

  describe('meta data', () => {
    it('should support exporting an object with a template function and metadata', async () => {
      const { default: templateModule } = await import('./assets/edit_data_function.cjs')
      templateModule.template.should.be.a.Function()
      templateModule.args.should.be.an.Array()
      templateModule.description.should.be.a.String()
      templateModule.examples.should.be.an.Array()
      const { stdout } = await wdTest('edit-entity --help ./test/assets/edit_data_function.cjs')
      stdout.should.containEql('Usage:')
      stdout.should.containEql('Add a P95228 statement')
      const { stdout: dryStdout } = await wdTest('edit-entity --dry ./test/assets/edit_data_function.cjs Q1 123')
      JSON.parse(dryStdout).args[0].id.should.equal('Q1')
    })

    it('should support adding metadata to the template function when main module export', async () => {
      const { default: templateModule } = await import('./assets/edit_data_function_deprecated.cjs')
      templateModule.should.be.a.Function()
      templateModule.args.should.be.an.Array()
      templateModule.description.should.be.a.String()
      templateModule.examples.should.be.an.Array()
      const { stdout } = await wdTest('edit-entity --help ./test/assets/edit_data_function_deprecated.cjs')
      stdout.should.containEql('Usage:')
      stdout.should.containEql('Add a P95228 statement')
      const { stdout: dryStdout } = await wdTest('edit-entity --dry ./test/assets/edit_data_function_deprecated.cjs Q1 123')
      JSON.parse(dryStdout).args[0].id.should.equal('Q1')
    })
  })
})
