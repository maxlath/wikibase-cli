const boolean = {
  type: 'boolean',
  default: false
}

const nonEmptyString = {
  type: 'string',
  test: (str) => typeof str === 'string' && str.length > 0
}

module.exports = {
  clipboard: boolean,
  json: boolean,
  lang: {
    type: 'lang',
    default: require('../local_lang'),
    test: (str) => typeof str === 'string' && str.length <= 3
  },
  verbose: boolean,
  username: nonEmptyString,
  password: nonEmptyString,
  instance: {
    type: 'string',
    default: 'https://wikidata.org/w/api.php',
    test: (url) => nonEmptyString.test(url) && url.startsWith('http')
  }
}
