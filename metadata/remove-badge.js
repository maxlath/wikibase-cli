module.exports = {
  alias: 'rb',
  args: '<entity> <site> [badges]',
  description: 'remove badges on an existing sitelink',
  options: require('../lib/common_options').editCommands,
  examples: [
    { args: 'Q4115189 enwikiquote Q17437796,Q17437798', comment: 'Remove Q17437796 and Q17437798 badges on Q4115189 enwikiquote sitelink' },
  ]
}
