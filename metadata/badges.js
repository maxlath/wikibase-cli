export default {
  alias: 'b',
  args: '',
  description: 'List sitelink badges available on a Wikibase instance',
  options: {
    lang: false,
    verbose: false,
    clipboard: true,
    json: true,
    instance: true,
    sparqlEndpoint: false,
  },
  examples: [
    { args: '', comment: 'List badges on the Wikibase instance set in config' },
    { args: '--instance https://test.wikidata.org', comment: 'List badges on an explicit Wikibase instance' },
  ],
}
