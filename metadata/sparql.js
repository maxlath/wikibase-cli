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
    { args: './path/to/query.rq', comment: 'make a SPARQL request from a file' },
    { args: './path/to/query_template.js Q123 Q456', comment: 'generate a SPARQL request from a template' },
    { args: './path/to/query.rq > ./results.json ', comment: 'output it in a file instead of the terminal' },
    { args: './path/to/query.rq --raw', comment: 'get the raw JSON results as query.wikidata.org outputs them, instead of a simplified version' },
    { args: './path/to/query.rq --format csv', comment: "set an alternative output format: json, xml, tsv, csv, binrdf, table. Default: 'table' when 1 value is selected, 'json' otherwise" },
    { args: './path/to/query.rq --index someVariableName', comment: 'get the results indexed by one of the SELECTed variables' },
    { args: './path/to/query.rq --dry', comment: 'output the SPARQL without running the query' },
    { args: './path/to/query.rq --open', comment: 'open the query in the Query Service GUI' }
  ]
}
