module.exports = {
  args: '<entity> <language> <aliases>',
  description: 'add one or several aliases to the list of aliases of an entity in a given language',
  options: {
    lang: false
  },
  examples: [
    { args: 'Q4115189 fr foo', comment: "add 'foo' to the Sandbox entity (Q4115189) French aliases" },
    { args: 'Q4115189 fr "foo|bar|buzz', comment: "add 'foo', 'bar', and 'buzz' to the Sandbox entity (Q4115189) French aliases" }
  ]
}
