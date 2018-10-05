const errors_ = require('./errors')

module.exports = (absoluePath, fnArgs) => {
  const fn = require(absoluePath)

  if (typeof fn !== 'function') {
    errors_.bundle('expected a function', { fn, type: typeof fn })
  }

  if (fn.length !== fnArgs.length) {
    const message = `the passed function expects ${fn.length} arguments`
    errors_.bundle(message, { fnArgs })
  }

  try {
    const result = fn(...fnArgs)
    if (!result) errors_.exit("the passed function didn't return anything", true)
    return result
  } catch (err) {
    errors_.exit(err)
  }
}
