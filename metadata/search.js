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
    { args: 'Harry Potter --properties P577,P935', comment: 'request additional properties (separated by a comma) to be added to the results summaries' },
    { args: 'date --type property', comment: 'Search properties (but `wb props` might be doing a better job)' },
    { args: 'date --type lexeme', comment: 'Search lexemes' },
    { args: 'code --type form', comment: 'Search forms' },
    { args: 'test --type sense', comment: "Searching senses doesn't seem to work currently (2020-04-17)" },
    { args: '--cirrus "porte haswbstatement:P31=Q5"', comment: 'Use Cirrus search to find humans (Q5) matching "porte"' },
  ]
}
