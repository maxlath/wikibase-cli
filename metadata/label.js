module.exports = {
  args: '<entity>',
  description: "display the entity's label",
  options: {
    lang: true
  },
  examples: [
    { args: 'Q123', comment: 'fetch the label for the entity Q123' },
    { args: 'Q123 --lang ja', comment: 'fetch the label for the entity Q123 in Japanese' }
  ]
}
