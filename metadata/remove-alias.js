module.exports = {
  args: '<entity> <language> <aliases>',
  description: 'remove one or several aliases from the list of aliases of an entity in a given language',
  options: require('./common_options').editCommands,
  examples: [
    { args: 'Q4115189 fr foo', comment: "remove 'foo' from the Sandbox entity (Q4115189) French aliases" },
    { args: 'Q4115189 fr "foo|bar|buzz', comment: "remove 'foo', 'bar', and 'buzz' from the Sandbox entity (Q4115189) French aliases" }
  ]
}
