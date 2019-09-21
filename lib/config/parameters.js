const { isPlainObject } = require('lodash')

const boolean = {
  type: 'boolean',
  default: false
}

const nonEmptyString = {
  type: 'string',
  test: str => typeof str === 'string' && str.length > 0
}

const object = {
  managed: true,
  type: 'object',
  test: isPlainObject
}

const url = defaultUrl => {
  return {
    type: 'string',
    default: defaultUrl,
    test: url => nonEmptyString.test(url) && url.startsWith('http')
  }
}

module.exports = {
  clipboard: boolean,
  json: boolean,
  lang: {
    type: 'lang',
    default: require('../local_lang'),
    test: str => typeof str === 'string' && str.length <= 3
  },
  verbose: boolean,
  credentials: object,
  bot: boolean,
  instance: url('https://wikidata.org/w/api.php'),
  'sparql-endpoint': url('https://query.wikidata.org/sparql')
}
