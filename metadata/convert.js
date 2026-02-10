export default {
  args: '',
  description: 'Convert batches of external ids to Wikidata ids and vice versa',
  options: {
    lang: false,
    verbose: true,
    clipboard: false,
    json: false,
    instance: false,
    sparqlEndpoint: true,
  },
  examples: [
    { args: '-p P268 -o 11865344k 11932251d', comment: 'Get the Wikidata ids corresponding to those BNF ids' },
    { args: '-p P268 -s Q45 Q140', comment: 'Get the BNF ids corresponding to those Wikidata ids' },
    { args: '-p P268 -o < ids_list', comment: 'The same but taking the ids from a file' },
  ],
}
