module.exports = {
  alias: 's',
  args: '<file.rq>',
  description: 'run a SPARQL query and get its JSON output',
  options: {
    lang: false,
    verbose: true,
    clipboard: true,
    json: true,
    instance: false,
    sparqlEndpoint: true
  },
  examples: [
    { args: './path/to/query.rq', comment: 'make a SPARQL request to query.wikidata.org from a file' },
    { args: './path/to/query.rq > ./results.json ', comment: 'output it in a file instead of the terminal' },
    { args: './path/to/query.rq --raw', comment: 'get the raw results as query.wikidata.org outputs them, instead of a simplified version' },
    { args: './path/to/query.rq --index someVariableName', comment: 'get the results indexed by one of the SELECTed variables' }
  ]
}
