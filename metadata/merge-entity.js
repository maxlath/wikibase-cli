const { editCommands } = require('./common_options')

module.exports = {
  args: '<from-id> <to-id>',
  description: 'Merge an entity into another',
  options: editCommands,
  examples: [
    {
      args: 'Q1 Q2',
      comment: 'merge Q1 into Q2'
    }
  ]
}
