module.exports = {
  args: '<key> [value]',
  description: 'get and set configuration parameters',
  options: {
    lang: false
  },
  examples: [
    { args: 'clipboard true', comment: 'always activate the clipboard when possible' },
    { args: 'lang nl', comment: 'set prefered language to Dutch' }
  ]
}
