const errors_ = require('./errors')

module.exports = (absoluePath, fnArgs) => {
  const fn = require(absoluePath)

  if (typeof fn !== 'function') {
    const err = errors_.new('expected a function', { fn, type: typeof fn })
    errors_.exit(err)
  }

  if (fn.length !== fnArgs.length) {
    const message = `the passed function expects ${fn.length} arguments`
    const err = errors_.new(message, { fnArgs })
    errors_.exit(err)
  }

  try {
    const result = fn(...fnArgs)
    if (!result) errors_.exit("the passed function didn't return anything", true)
    return result
  } catch (err) {
    errors_.exit(err)
  }
}
