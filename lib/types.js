export const isArray = data => data instanceof Array
export const isPlainObject = data => !isArray(data) && typeof data === 'object'
export const isCollection = data => isArray(data) && isPlainObject(data[0])
export const isPositiveIntegerString = str => typeof str === 'string' && /^\d+$/.test(str)
