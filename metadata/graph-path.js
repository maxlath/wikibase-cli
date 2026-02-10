export default {
  alias: 'gp',
  args: '<subject> <property> <object>',
  description: 'Find the path between a subject and an object on the entity relations graph',
  options: {
    lang: true,
    verbose: true,
    clipboard: false,
    json: false,
    instance: false,
    sparqlEndpoint: true,
  },
  examples: [
    { args: 'Q336 P279 Q5891', comment: 'Find by which path science (Q336) is a subclass of (P279) philosophy (Q5891)' },
  ],
}
