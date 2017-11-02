const qs = require('querystring')
const error_ = require('../error')

module.exports = value => {
  if (typeof value !== 'string') return value

  // JSON parser
  if (value[0] === '{' && value.slice(-1)[0] === '}') {
    try {
      value = JSON.parse(value)
      return value
    } catch (rawErr) {
      const err = error_.new('invalid JSON value', value)
      err.statusCode = 400
      throw err
    }
  }

  // query string parser
  const equalCount = countChar(value, '=')
  const andCount = countChar(value, '&')
  if (equalCount > 0 && andCount > 0 && equalCount === andCount + 1) {
    value = qs.parse(value)
  }

  return value
}

const countChar = (str, char) => str.split(char).length - 1
