const { editCommands } = require('../lib/common_options')

module.exports = {
  alias: 'de',
  args: '<id>',
  description: 'Delete an entity',
  options: editCommands,
  examples: [
    {
      args: 'Q1',
      comment: 'delete an item'
    },
    {
      args: 'P1',
      comment: 'delete a property'
    }
  ]
}
