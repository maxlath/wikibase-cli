module.exports = {
  alias: 'sl',
  args: '<entity> <language> <label>',
  description: 'set a label on an entity in a given language',
  options: require('../lib/common_options').editCommands,
  examples: [
    { args: 'Q4115189 fr "Bac à sable bulgroz"', comment: "set the label 'Bac à sable bulgroz' to the Sandbox entity (Q4115189) in French" }
  ]
}
