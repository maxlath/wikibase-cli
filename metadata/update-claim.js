module.exports = {
  alias: 'uc',
  args: '<entity> <property> <old-value> <new-value>',
  description: "update a claim's value",
  options: require('../lib/common_options').editCommands,
  examples: [
    { args: 'Q4115189 P2002 Zorglub Bulgroz', comment: "change the the Sandbox (Q4115189) Twitter account (P2002) from 'Zorglub' to 'Bulgroz'" }
  ]
}
