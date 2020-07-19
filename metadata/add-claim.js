const { editCommands } = require('../lib/common_options')

module.exports = {
  alias: 'ac',
  args: '<entity> <property> <value>',
  description: 'add a claim to an entity',
  options: Object.assign({ rank: true }, editCommands),
  examples: [
    { args: 'Q4115189 P2002 Zorglub', comment: "add the Twitter account (P2002) 'Zorglub' to the Sandbox (Q4115189) entity" }
  ]
}
