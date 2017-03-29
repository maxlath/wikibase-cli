module.exports = {
  args: '<entity> [property]',
  description: 'display the claims of an entity',
  options: {
    lang: true
  },
  examples: [
    { args: 'Q123', comment: 'fetch all claims for the entity Q123' },
    { args: 'Q123 --lang de', comment: 'fetch all claims for the entity Q123 with properties labels in German' }
  ]
}
