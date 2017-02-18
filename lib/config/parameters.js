module.exports = {
  clipboard: {
    type: 'boolean',
    default: false
  },
  json: {
    type: 'boolean',
    default: false
  },
  lang: {
    type: 'lang',
    default: require('../local_lang'),
    test: (str) => typeof str === 'string' && str.length <= 3
  },
  verbose: {
    type: 'boolean',
    default: false
  }
}
