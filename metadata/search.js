module.exports = {
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
    { args: 'Harry Potter --limit 25', comment: 'displays up to 25 results matching "Harry Potter"' }
  ]
}
