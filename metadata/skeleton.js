module.exports = {
  args: '<entity>',
  description: "output the pre-formatted item's data optimized for edition with `wd edit-item`",
  options: {
    lang: false,
    verbose: false,
    clipboard: false,
    json: false,
    instance: true,
    sparqlEndpoint: false
  },
  examples: [
    { args: 'Q123', comment: 'get Q123 pre-formatted data' }
  ]
}
