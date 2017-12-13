const qs = require('querystring')
const errors_ = require('../errors')

module.exports = value => {
  if (typeof value !== 'string') return value

  // JSON parser
  if (value[0] === '{' && value.slice(-1)[0] === '}') {
    try {
      value = JSON.parse(value)
      return value
    } catch (rawErr) {
      const err = errors_.new('invalid JSON value', value)
      err.statusCode = 400
      throw err
    }
  }

  // Don't let strings including special characters
  // go through the query string parser.
  // Especially, don't let URLs be interpreted as a query string.
  // The test here after rely on the fact that object values
  // never have a key with special characters
  if (/\W+/.test(value.split('=')[0])) return value

  // query string parser
  const equalCount = countChar(value, '=')
  const andCount = countChar(value, '&')
  if (equalCount > 0 && andCount > 0 && equalCount === andCount + 1) {
    value = qs.parse(value)
  }

  return value
}

const countChar = (str, char) => str.split(char).length - 1
