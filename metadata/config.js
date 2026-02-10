import { grey } from 'tiny-chalk'

export default {
  args: '<key> [value]',
  description: 'Get and set configuration parameters',
  options: {
    lang: false,
    verbose: false,
    clipboard: false,
    json: true,
    instance: false,
    sparqlEndpoint: false,
  },
  examples: [
    { args: 'clipboard true', comment: 'Always copy results to the clipboard when possible' },
    { args: 'lang nl', comment: 'Set prefered language to Dutch' },
    { args: 'instance reset', comment: 'Reset the instance setting to its default value' },
    { args: 'credentials https://www.wikidata.org', comment: 'Get the credentials for an instance' },
    { args: 'credentials https://localhost:8181 reset', comment: 'Reset the credentials for an instance' },
    { args: 'credentials http://localhost:8181 test', comment: 'Test the validity of your credentials for an instance' },
    { args: 'path', comment: 'Get configuration path' },
    { args: 'reset', comment: 'Reset configuration' },
    { args: `--json > config.json.backup\n  ${grey('# to restore it, simply override the current config file')}\n  cp config.json.backup $(wb config path)`, comment: 'Can be used to backup the config' },
  ],
  doc: 'https://github.com/maxlath/wikibase-cli/blob/main/docs/config.md#config',
}
