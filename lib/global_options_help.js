export const globalOptions = {
  config: [ '--config <path>', 'Path to the config.json file' ],
}

export const commandSpecificOptions = {
  lang: [ '-l, --lang <lang>', 'specify the language to use' ],
  verbose: [ '-v, --verbose', 'make the output more verbose' ],
  dry: [ '-d, --dry', 'output the generated data, do not run the query' ],
  clipboard: [ '-c, --clipboard', 'copy command results to the clipboard' ],
  json: [ '-j, --json', 'output command results formatted as JSON' ],
  instance: [ '-i, --instance <url>', 'customize the Wikibase instance' ],
  sparqlEndpoint: [ '-e, --sparql-endpoint <url>', 'customize the SPARQL endpoint' ],
  batch: [ '-b, --batch', 'execute in batch. See documentation https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#batch-mode' ],
  noExitOnError: [ '--no-exit-on-error', 'in batch mode, prevents exiting if an error occurs (the error will be logged on stderr)' ],
  summary: [ '-s, --summary <text>', 'set the edit summary' ],
  baserevid: [ '--baserevid <id>', 'set the baserevid' ],
  maxlag: [ '--maxlag <num>', 'set the maxlag value' ],
  rank: [ '--rank <rank>', 'set the claim rank' ],
  keepOldest: [ '--keep-oldest', "Merge the newest entity in the oldest one. By default, the arguments' order determines which entity is kept: the first entity is merged into the second entity" ],
}
