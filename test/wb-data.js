const should = require('should')
const { shellExec } = require('./lib/utils')
const _ = require('lodash')

const attributes = [ 'pageid', 'ns', 'title', 'lastrevid', 'modified', 'type', 'id', 'labels', 'descriptions', 'aliases', 'claims', 'sitelinks' ]

describe('wb data', function () {
  this.timeout(20000)

  // This test fails when run from a script as process.stdin.isTTY is undefined
  // and the script thus will listen for stdin. But it works when run manually,
  // and no other way to detect a stdin input was found

  // it('should display help', async () => {
  //   const { stdout } = await shellExec('./bin/wd data')
  //   stdout.should.containEql('Usage:')
  // })

  it('<entity>', async () => {
    const { stdout } = await shellExec('./bin/wd data Q123456')
    stdout.startsWith('{').should.be.true()
    const data = JSON.parse(stdout)
    const dataAttrs = Object.keys(data)
    attributes.length.should.equal(dataAttrs.length)
    dataAttrs.forEach(attr => should(attributes.indexOf(attr) > -1).be.true())
  })

  it('should accept several ids', async () => {
    const { stdout } = await shellExec('./bin/wd data Q123456 Q123')
    const lines = stdout.split('\n')
    lines.length.should.equal(2)
    lines.forEach(line => {
      Object.keys(JSON.parse(line)).forEach(attr => {
        should(attributes.includes(attr)).be.true()
      })
    })
  })

  it('should output entities as ndjson', async () => {
    const { stdout } = await shellExec('./bin/wd data Q123456 Q1512522')
    stdout.split('\n').length.should.equal(2)
  })

  it('should simplify entity when requested', async () => {
    const { stdout } = await shellExec('./bin/wd data Q1512522 --simplify')
    const entity = JSON.parse(stdout)
    entity.labels.de.should.be.a.String()
    entity.descriptions.de.should.be.a.String()
    entity.aliases.de[0].should.be.a.String()
    entity.claims.P31[0].should.be.a.String()
  })

  it('should simplify entities when requested', async () => {
    const { stdout } = await shellExec('./bin/wd data Q1512522 Q123456 --simplify')
    const entity = JSON.parse(stdout.split('\n')[0])
    entity.labels.de.should.be.a.String()
    entity.descriptions.de.should.be.a.String()
    entity.aliases.de[0].should.be.a.String()
    entity.claims.P31[0].should.be.a.String()
  })

  it('should return only the desired props when requested', async () => {
    const { stdout } = await shellExec('./bin/wd data Q1512522 --props labels,aliases')
    const entity = JSON.parse(stdout)
    should(entity.labels).be.an.Object()
    should(entity.descriptions).not.be.ok()
    should(entity.aliases).be.an.Object()
    should(entity.descriptions).not.be.ok()
    should(entity.sitelinks).not.be.ok()
  })

  // Known to fail due to inconsistencies in the Wikibase API
  // which doesn't recognizes lexemes, forms, and senses as valid props
  xit('should support lexemes', async () => {
    const { stdout } = await shellExec('./bin/wd data L525 --props lexemes,forms')
    const entity = JSON.parse(stdout)
    should(entity.lexemes).be.an.Object()
    should(entity.senses).not.be.ok()
    should(entity.forms).be.an.Object()
  })

  it('should accept ids on stdin', async () => {
    const { stdout } = await shellExec('echo "Q123456 Q123" | ./bin/wd data --props labels --simplify')
    const lines = stdout.split('\n')
    lines.length.should.equal(2)
    const entities = lines.map(JSON.parse.bind(JSON))
    entities[0].id.should.equal('Q123456')
    entities[1].id.should.equal('Q123')
    entities.forEach(entity => {
      should(entity.labels).be.an.Object()
      _.values(entity.labels).forEach(label => {
        label.should.be.a.String()
      })
      should(entity.descriptions).not.be.ok()
      should(entity.aliases).not.be.ok()
      should(entity.descriptions).not.be.ok()
      should(entity.sitelinks).not.be.ok()
    })
  })

  it('should return ttl when requested', async () => {
    const { stdout } = await shellExec('./bin/wd data Q1512522 --format ttl')
    stdout.should.startWith('@prefix rdf:')
  })

  describe('property claims data', () => {
    it('should get property claims data provided a property claims id', async () => {
      const propertyClaimsId = 'Q2#P31'
      const { stdout } = await shellExec(`./bin/wd data '${propertyClaimsId}'`)
      const propertyClaims = JSON.parse(stdout)
      propertyClaims.should.be.an.Array()
      propertyClaims[0].id.should.startWith('Q2$')
      propertyClaims.forEach(claim => {
        claim.mainsnak.property.should.equal('P31')
      })
    })
  })

  describe('claim data', () => {
    it('should get a claim data provided a claim guid', async () => {
      const guid = 'Q2$50fad68d-4f91-f878-6f29-e655af54690e'
      const { stdout } = await shellExec(`./bin/wd data '${guid}'`)
      const claim = JSON.parse(stdout)
      claim.id.should.equal(guid)
      claim.mainsnak.property.should.equal('P31')
      claim.mainsnak.datavalue.value.id.should.equal('Q3504248')
    })

    it('should accept prefixed claim GUIDs', async () => {
      const prefixedGuid = 'wds:Q2-50fad68d-4f91-f878-6f29-e655af54690e'
      const { stdout } = await shellExec(`./bin/wd data '${prefixedGuid}'`)
      const claim = JSON.parse(stdout)
      claim.id.should.equal('Q2$50fad68d-4f91-f878-6f29-e655af54690e')
      claim.mainsnak.property.should.equal('P31')
      claim.mainsnak.datavalue.value.id.should.equal('Q3504248')
    })

    it('should accept claim GUIDs with an - in place of a $', async () => {
      const hyphenedGuid = 'Q2-50fad68d-4f91-f878-6f29-e655af54690e'
      const { stdout } = await shellExec(`./bin/wd data '${hyphenedGuid}'`)
      const claim = JSON.parse(stdout)
      claim.id.should.equal('Q2$50fad68d-4f91-f878-6f29-e655af54690e')
      claim.mainsnak.property.should.equal('P31')
      claim.mainsnak.datavalue.value.id.should.equal('Q3504248')
    })

    it('should get a simplified claim', async () => {
      const { stdout } = await shellExec('./bin/wd data --simplify \'Q2$50fad68d-4f91-f878-6f29-e655af54690e\'')
      stdout.should.equal('Q3504248')
    })

    it('should keep the requested simplified claim data', async () => {
      const guid = 'Q2$50fad68d-4f91-f878-6f29-e655af54690e'
      const { stdout } = await shellExec(`./bin/wd data --simplify --keep ids,references,qualifiers '${guid}'`)
      const claim = JSON.parse(stdout)
      claim.id.should.equal(guid)
      claim.value.should.equal('Q3504248')
      claim.references.should.be.an.Array()
      claim.qualifiers.should.be.an.Object()
    })
  })
})
