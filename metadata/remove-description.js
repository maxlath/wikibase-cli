module.exports = {
  alias: 'rd',
  args: '<entity> <language>',
  description: 'remove a description on an entity for a given language',
  options: require('../lib/common_options').editCommands,
  examples: [
    { args: 'Q4115189 it', comment: 'Remove Q4115189 description in Italian' },
  ]
}
