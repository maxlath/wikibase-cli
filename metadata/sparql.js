export default {
  alias: 's',
  args: '<file.rq>',
  description: 'Run a SPARQL query and get its JSON output',
  options: {
    lang: false,
    verbose: true,
    clipboard: true,
    json: true,
    instance: false,
    sparqlEndpoint: true,
  },
  examples: [
    { args: './path/to/query.rq', comment: 'Make a SPARQL request from a file' },
    { args: './path/to/query_template.js Q123 Q456', comment: 'Generate a SPARQL request from a template' },
    { args: './path/to/query.rq > ./results.json ', comment: 'Output it in a file instead of the terminal' },
    { args: './path/to/query.rq --raw', comment: 'Get the raw JSON results as query.wikidata.org outputs them, instead of a simplified version' },
    { args: './path/to/query.rq --format csv', comment: "Set an alternative output format: json, xml, tsv, csv, binrdf, table. Default: 'table' when 1 value is selected, 'json' otherwise" },
    { args: './path/to/query.rq --index someVariableName', comment: 'Get the results indexed by one of the SELECTed variables' },
    { args: './path/to/query.rq --dry', comment: 'Output the SPARQL without running the query' },
    { args: './path/to/query.rq --open', comment: 'Open the query in the Query Service GUI' },
  ],
}
