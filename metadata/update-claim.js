const { editCommands } = require('../lib/common_options')

module.exports = {
  alias: 'uc',
  args: '<guid> <new-value>',
  description: "update a claim's value",
  options: Object.assign({ rank: true }, editCommands),
  examples: [
    { args: 'Q4115189$bc43ae33-7525-42cb-ad31-b1e1cf3cb72d Bulgroz', comment: "update the claim identified by this id with the value 'Bulgroz'" },
    { args: 'Q4115189 P2002 Zorglub Bulgroz', comment: "change the the Sandbox (Q4115189) Twitter account (P2002) from 'Zorglub' to 'Bulgroz'" }
  ]
}
