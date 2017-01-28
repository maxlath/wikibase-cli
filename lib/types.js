const isArray = (data) => data instanceof Array
const isPlainObject = (data) => !isArray(data) && typeof data === 'object'
const isCollection = (data) => isArray(data) && isPlainObject(data[0])

module.exports = { isArray, isPlainObject, isCollection }
