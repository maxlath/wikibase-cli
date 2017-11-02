module.exports = {
  args: '<claim-guid> <references-hashes>',
  description: 'remove references from a claim',
  options: require('./common_options').editCommands,
  examples: [
    { args: "'Q4115189$E51978A1-D13A-4916-800E-74ACD2466970' '72ea3cdd27062da9f0971c1feab6df32d729ecb3'", comment: 'remove a reference from this claim' },
    { args: "'Q4115189$E51978A1-D13A-4916-800E-74ACD2466970' '72ea3cdd27062da9f0971c1feab6df32d729ecb3|5e9840f6896948b13d6e9c6328169643229aa3db'", comment: 'remove several references from this claim' }
  ]
}
