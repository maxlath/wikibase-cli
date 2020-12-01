const errors_ = require('./errors')

module.exports = (absoluePath, inputArgs) => {
  let fn = require(absoluePath)
  let metadata

  if (fn && fn.template) {
    metadata = fn
    fn = fn.template
  }

  if (typeof fn !== 'function') {
    errors_.bundle('expected a function', { fn, type: typeof fn })
  }

  if (metadata) {
    const minArgs = minimumRequiredArgs(metadata.args)
    if (metadata.args && inputArgs.length < minArgs) {
      const message = `the passed function expects at least ${minArgs} arguments`
      errors_.bundle(message, { expectedArgs: metadata.args, inputArgs })
    }
  } else {
    if (fn.length !== inputArgs.length) {
      const message = `the passed function expects ${fn.length} arguments`
      errors_.bundle(message, { inputArgs })
    }
  }

  try {
    const result = fn(...inputArgs)
    if (!result) errors_.exit("the passed function didn't return anything", true)
    return result
  } catch (err) {
    errors_.exit(err)
  }
}

const minimumRequiredArgs = (args = '') => {
  if (args instanceof Array) args = args.join(' ')
  const requiredArgs = args.match(/<[\w-]+>/g)
  return requiredArgs != null ? requiredArgs.length : 0
}
