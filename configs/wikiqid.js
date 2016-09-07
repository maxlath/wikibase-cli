module.exports = {
  args: '<title>',
  description: 'get a Wikidata id from a Wikipedia article title',
  options: {
    lang: true
  },
  examples: [
    { args: 'Cantabria', comment: 'get the Wikidata id corresponding to the article "Cantabria" in Wikipedia' },
    { args: 'science politique --lang fr', comment: 'get the Wikidata id corresponding to the article "science politique" in the French Wikipedia' }
  ]
}
