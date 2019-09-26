module.exports = {
  alias: 'sa',
  args: '<entity> <language> <aliases>',
  description: 'set the list of aliases of an entity in a given language',
  options: require('../lib/common_options').editCommands,
  examples: [
    { args: 'Q4115189 fr foo', comment: "replaces the Sandbox entity (Q4115189) French aliases by 'foo'" },
    { args: 'Q4115189 fr "foo|bar|buzz', comment: "replaces the Sandbox entity (Q4115189) French aliases by foo', 'bar', and 'buzz'" }
  ]
}
