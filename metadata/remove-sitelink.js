module.exports = {
  alias: 'rs',
  args: '<entity> <site>',
  description: 'remove a sitelink on an entity for a given site',
  options: require('../lib/common_options').editCommands,
  examples: [
    { args: 'Q4115189 enwikiquote', comment: 'Remove the link from Q4115189 to any article in the English Wikiquote' },
  ]
}
