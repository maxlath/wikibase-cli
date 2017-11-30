const error_ = require('./error')

module.exports = (absoluePath, fnArgs) => {
  const fn = require(absoluePath)

  if (typeof fn !== 'function') {
    const err = error_.new('expected a function', { fn, type: typeof fn })
    error_.exit(err)
  }

  if (fn.length !== fnArgs.length) {
    const message = `the passed function expects ${fn.length} arguments`
    const err = error_.new(message, { fnArgs })
    error_.exit(err)
  }

  try {
    const result = fn(...fnArgs)
    if (!result) error_.exit("the passed function didn't return anything", true)
    return result
  } catch (err) {
    error_.exit(err)
  }
}
