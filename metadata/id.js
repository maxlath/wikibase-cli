module.exports = {
  args: '<title>',
  description: 'get a Wikidata id from a Wikipedia article title',
  options: {
    lang: true,
    verbose: true,
    clipboard: true,
    json: false,
    instance: true,
    sparqlEndpoint: false
  },
  examples: [
    { args: 'Cantabria', comment: 'get the Wikidata id corresponding to the article "Cantabria" in Wikipedia' },
    { args: 'science politique --lang fr', comment: 'get the Wikidata id corresponding to the article "science politique" in the French Wikipedia' }
  ]
}
