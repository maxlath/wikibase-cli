module.exports = {
  alias: 'rl',
  args: '<entity> <language>',
  description: 'remove a label on an entity for a given language',
  options: require('../lib/common_options').editCommands,
  examples: [
    { args: 'Q4115189 it', comment: 'Remove Q4115189 label in Italian' },
  ]
}
