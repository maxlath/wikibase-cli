module.exports = {
  args: '<entity>',
  description: 'display basic information on the requested entity',
  options: {
    lang: true
  },
  examples: [
    { args: 'Q123', comment: 'display basic information for the entity Q123' },
    { args: 'Q123 --lang ja', comment: 'display basic information for the entity Q123 in Japanese' }
  ]
}
