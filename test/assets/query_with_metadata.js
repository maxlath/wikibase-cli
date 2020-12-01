module.exports = {
  description: 'Query items with a certain author as author (P50)',

  args: [ '<author-id>' ],

  examples: [
    { args: [ 'Q1345582' ], comment: 'Query items with Gilbert Simondon has author (P50)' },
  ],

  template: async authorId => {
    return `SELECT ?work WHERE { ?work wdt:P50 wd:${authorId} . }`
  }
}
