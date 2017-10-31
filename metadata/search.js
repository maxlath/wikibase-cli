module.exports = {
  args: '<search>',
  description: 'search entities',
  options: {
    lang: true,
    verbose: false,
    clipboard: false,
    json: true,
    instance: true,
    sparqlEndpoint: false
  },
  examples: [
    { args: 'Ligo', comment: 'displays a list of entities matching "Ligo"' }
  ]
}
