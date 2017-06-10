const isArray = data => data instanceof Array
const isPlainObject = data => !isArray(data) && typeof data === 'object'
const isCollection = data => isArray(data) && isPlainObject(data[0])
const isPositiveIntegerString = str => typeof str === 'string' && /^\d+$/.test(str)

module.exports = { isArray, isPlainObject, isCollection, isPositiveIntegerString }
