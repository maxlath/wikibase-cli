import 'should'
import { wbDry } from '#tests/lib/utils'

describe('wb add-claim', () => {
  it('should add a claim with inlined arguments', async () => {
    const { stdout, stderr } = await wbDry('add-claim Q1111 P95180 "add-claim test"')
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('claim')
    action.should.equal('create')
    args.should.deepEqual([
      {
        id: 'Q1111',
        property: 'P95180',
        value: 'add-claim test',
      },
    ])
  })

  it('should add a claim in object mode', async () => {
    const { stdout, stderr } = await wbDry(`add-claim '{"id":"Q4115189","property":"P370","value":"foo"}'`)
    stderr.should.equal('')
    const { section, action, args } = JSON.parse(stdout)
    section.should.equal('claim')
    action.should.equal('create')
    args.should.deepEqual([
      {
        id: 'Q4115189',
        property: 'P370',
        value: 'foo',
      },
    ])
  })

  describe('reconcilation', () => {
    it('should add reconciliation mode with inlined arguments', async () => {
      const { stdout, stderr } = await wbDry('add-claim Q1111 P95180 "add-claim test" --reconciliation skip-on-value-match')
      stderr.should.equal('')
      const { section, action, args } = JSON.parse(stdout)
      section.should.equal('claim')
      action.should.equal('create')
      args.should.deepEqual([
        {
          id: 'Q1111',
          property: 'P95180',
          value: 'add-claim test',
          reconciliation: { mode: 'skip-on-value-match' },
        },
      ])
    })

    it('should add reconciliation mode in object mode', async () => {
      const { stdout, stderr } = await wbDry(`add-claim '{"id":"Q4115189","property":"P370","value":"foo"}' --reconciliation skip-on-value-match`)
      stderr.should.equal('')
      const { section, action, args } = JSON.parse(stdout)
      section.should.equal('claim')
      action.should.equal('create')
      args.should.deepEqual([
        {
          id: 'Q4115189',
          property: 'P370',
          value: 'foo',
          reconciliation: { mode: 'skip-on-value-match' },
        },
      ])
    })

    it('should set a reconciliation strategy object', async () => {
      const reconciliation = {
        mode: 'merge',
        matchingQualifiers: [ 'P580:any', 'P582:all' ],
        matchingReferences: [ 'P854', 'P813' ],
      }
      const { stdout, stderr } = await wbDry(`add-claim '{"id":"Q4115189","property":"P370","value":"foo"}' --reconciliation '${JSON.stringify(reconciliation)}'`)
      stderr.should.equal('')
      const { section, action, args } = JSON.parse(stdout)
      section.should.equal('claim')
      action.should.equal('create')
      args.should.deepEqual([
        {
          id: 'Q4115189',
          property: 'P370',
          value: 'foo',
          reconciliation,
        },
      ])
    })
  })
})
