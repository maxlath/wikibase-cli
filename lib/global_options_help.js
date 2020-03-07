module.exports = {
  lang: [ '-l, --lang <lang>', 'specify the language to use' ],
  verbose: [ '-v, --verbose', 'make the output more verbose' ],
  dry: [ '-d, --dry', 'output the generated data, do not run the query' ],
  clipboard: [ '-c, --clipboard', 'copy command results to the clipboard' ],
  json: [ '-j, --json', 'output command results formatted as JSON' ],
  instance: [ '-i, --instance <url>', 'customize the Wikibase instance' ],
  sparqlEndpoint: [ '-e, --sparql-endpoint <url>', 'customize the SPARQL endpoint' ],
  batch: [ '-b, --batch', 'execute in batch. See documentation https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#batch-mode' ]
}
