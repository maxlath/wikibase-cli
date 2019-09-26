module.exports = {
  alias: 'f',
  args: '<search>',
  description: 'search entities',
  options: {
    lang: true,
    verbose: true,
    clipboard: false,
    json: true,
    instance: true,
    sparqlEndpoint: false
  },
  examples: [
    { args: 'Ligo', comment: 'displays a list of entities matching "Ligo"' },
    { args: 'Harry Potter --limit 25', comment: 'displays up to 25 results matching "Harry Potter"' },
    { args: 'Harry Potter --verbose', comment: 'display rich results (aka summaries)' },
    { args: 'Harry Potter --properties P577,P935', comment: 'request additional properties (separated by a comma) to be added to the results summaries' }
  ]
}
