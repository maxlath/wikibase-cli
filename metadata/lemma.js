module.exports = {
  args: '<lexeme>',
  description: "display the lexeme's lemma",
  options: require('../lib/common_options').entityAttributeCommands,
  examples: [
    { args: 'L525', comment: 'fetch the lemma for the lexeme L525' },
    { args: 'L525 --lang ja', comment: 'fetch the lemma for the lexeme L525 in Japanese' }
  ]
}
