module.exports = {
  args: '<language code or wikidata id>',
  description: 'identify language code and return associated data',
  options: {
    lang: false,
    verbose: false,
    clipboard: true,
    json: true,
    instance: false,
    sparqlEndpoint: false
  },
  examples: [
    { args: 'ak', comment: 'find data associated with the Akan language from its language code' },
    { args: 'Q28026', comment: 'find data associated with the Akan language from its Wikidata item id' }
  ]
}
