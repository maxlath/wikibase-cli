const { grey } = require('chalk')

module.exports = {
  args: '<key> [value]',
  description: 'get and set configuration parameters',
  options: {
    lang: false,
    verbose: false,
    clipboard: false,
    json: true,
    instance: false,
    sparqlEndpoint: false
  },
  examples: [
    { args: 'clipboard true', comment: 'always copy results to the clipboard when possible' },
    { args: 'lang nl', comment: 'set prefered language to Dutch' },
    { args: 'instance reset', comment: 'reset the instance setting to its default value' },
    { args: 'credentials https://www.wikidata.org', comment: 'get the credentials for an instance' },
    { args: 'credentials https://localhost:8181 reset', comment: 'reset the credentials for an instance' },
    { args: 'credentials http://localhost:8181 test', comment: 'test the validity of your credentials for an instance' },
    { args: 'path', comment: 'get configuration path' },
    { args: 'reset', comment: 'reset configuration' },
    { args: `--json > config.json.backup\n  ${grey('# to restore it, simply override the current config file')}\n  cp config.json.backup $(wb config path)`, comment: 'can be used to backup the config' }
  ],
  doc: 'https://github.com/maxlath/wikibase-cli/blob/master/docs/config.md#config'
}
