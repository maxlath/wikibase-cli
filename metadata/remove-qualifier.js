module.exports = {
  args: '<claim-guid> <qualifiers-hashes>',
  description: 'remove qualifiers from a claim',
  options: require('./common_options').editCommands,
  examples: [
    { args: "'Q4115189$E51978A1-D13A-4916-800E-74ACD2466970' '24aa18192de7051f81d88d1ab514826002d51c14'", comment: 'remove a qualifier from this claim' },
    { args: "'Q4115189$E51978A1-D13A-4916-800E-74ACD2466970' '24aa18192de7051f81d88d1ab514826002d51c14|f6c14e4eebb3d4f7595f0952c1ece0a34d85368b'", comment: 'remove several qualifiers from this claim' }
  ]
}
