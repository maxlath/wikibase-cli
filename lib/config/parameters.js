import { isPlainObject } from 'lodash-es'
import { localLang } from '#lib/local_lang'
import { defaultUserAgent } from '#lib/request_headers'
import { isValidLang } from '#lib/validate'

const boolean = {
  type: 'boolean',
  default: false,
}

const integer = {
  type: 'number',
  default: 5,
  test: num => Number.isInteger(num) && num >= 0,
}

const nonEmptyString = {
  type: 'string',
  test: str => typeof str === 'string' && str.length > 0,
}

const object = {
  managed: true,
  type: 'object',
  test: isPlainObject,
}

const url = defaultUrl => ({
  type: 'string',
  default: defaultUrl,
  test: url => nonEmptyString.test(url) && url.startsWith('http'),
})

export default {
  clipboard: boolean,
  json: boolean,
  lang: {
    type: 'lang',
    default: localLang,
    test: isValidLang,
  },
  verbose: boolean,
  credentials: object,
  bot: boolean,
  maxlag: integer,
  instance: url('https://wikidata.org'),
  'sparql-endpoint': url('https://query.wikidata.org/sparql'),
  'user-agent': { ...nonEmptyString, default: defaultUserAgent },
}
