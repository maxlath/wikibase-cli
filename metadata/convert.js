module.exports = {
  args: '',
  description: 'convert external ids to Wikidata ids',
  options: {
    lang: false,
    verbose: true,
    clipboard: false,
    json: false,
    instance: false,
    sparqlEndpoint: true
  },
  examples: [
    { args: 'P268 11865344k 11932251d', comment: 'get the Wikidata ids corresponding to those BNF ids' }
  ]
}
