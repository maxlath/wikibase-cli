module.exports = {
  alias: 'r',
  args: '<entity>',
  description: "output the entity's revisions data",
  options: {
    lang: false,
    verbose: false,
    clipboard: false,
    json: false,
    instance: true,
    sparqlEndpoint: false
  },
  examples: [
    { args: 'Q3548931', comment: "fetch Q3548931's revisions data" },
    { args: 'Property:P31', comment: "fetch P31's revisions data" }
  ]
}
