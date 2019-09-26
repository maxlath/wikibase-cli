const { editCommands } = require('../lib/common_options')

module.exports = {
  alias: 'me',
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
