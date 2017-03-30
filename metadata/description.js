module.exports = {
  args: '<entity>',
  description: "display the entity's description",
  options: {
    lang: true
  },
  examples: [
    { args: 'Q123', comment: 'fetch the description for the entity Q123' },
    { args: 'Q123 --lang ja', comment: 'fetch the description for the entity Q123 in Japanese' }
  ]
}
