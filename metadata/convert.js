module.exports = {
  args: '',
  description: 'convert batches of external ids to Wikidata ids and vice versa',
  options: {
    lang: false,
    verbose: true,
    clipboard: false,
    json: false,
    instance: false,
    sparqlEndpoint: true
  },
  examples: [
    { args: 'P268 11865344k 11932251d', comment: 'get the Wikidata ids corresponding to those BNF ids' },
    { args: 'P268 Q45 Q140', comment: 'get the BNF ids corresponding to those Wikidata ids' },
    { args: 'P268 < ids_list', comment: 'the same but taking the ids from a file' }
  ]
}
