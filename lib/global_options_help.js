import { defaultUserAgent } from './request_headers.js'

export const globalOptions = {
  config: [ '--config <path>', 'Path to the config.json file' ],
  logResponseHeaders: [ '--log-response-headers [comma-separated headers names]', 'Request to output all or some HTTP header fields from the server response on stderr' ],
  userAgent: [ '--user-agent <name>', `Customize requests user agent. Default user agent = "${defaultUserAgent}".\nSee https://foundation.wikimedia.org/wiki/Policy:Wikimedia_Foundation_User-Agent_Policy` ],
}

export const commandSpecificOptions = {
  lang: [ '-l, --lang <lang>', 'Specify the language to use' ],
  verbose: [ '-v, --verbose', 'Make the output more verbose' ],
  dry: [ '-d, --dry', 'Output the generated data, do not run the query' ],
  clipboard: [ '-c, --clipboard', 'Copy command results to the clipboard' ],
  json: [ '-j, --json', 'Output command results formatted as JSON' ],
  instance: [ '-i, --instance <url>', 'Customize the Wikibase instance' ],
  sparqlEndpoint: [ '-e, --sparql-endpoint <url>', 'Customize the SPARQL endpoint' ],
  batch: [ '-b, --batch', 'Execute in batch. See documentation https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#batch-mode' ],
  noExitOnError: [ '--no-exit-on-error', 'In batch mode, prevents exiting if an error occurs (the error will be logged on stderr)' ],
  summary: [ '-s, --summary <text>', 'Set the edit summary' ],
  baserevid: [ '--baserevid <id>', 'Set the baserevid' ],
  maxlag: [ '--maxlag <num>', 'Set the maxlag value' ],
  rank: [ '--rank <rank>', 'Set the claim rank' ],
  reconciliation: [ '--reconciliation <reconciliation object|reconciliation mode>', 'Set the claim reconciliation strategy, see https://github.com/maxlath/wikibase-edit/blob/main/docs/how_to.md#reconciliation' ],
  keepOldest: [ '--keep-oldest', "Merge the newest entity in the oldest one. By default, the arguments' order determines which entity is kept: the first entity is merged into the second entity" ],
}
