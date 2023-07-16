import errors_ from './errors.js'

export default (fn, inputArgs, metadata) => {
  if (typeof fn !== 'function') {
    errors_.bundle('expected a function', { fn, type: typeof fn })
  }

  if (metadata) {
    const minArgs = minimumRequiredArgs(metadata.args)
    if (metadata.args && inputArgs.length < minArgs) {
      const message = `the passed function expects at least ${minArgs} arguments`
      errors_.bundle(message, { expectedArgs: metadata.args, inputArgs, fn: fn.toString() })
    }
  } else {
    const minArgs = fn.length
    // It might be that the function accepts more than fn.length arguments
    // as rest parameters aren't counted
    if (inputArgs.length < minArgs) {
      const message = `the passed function expects at least ${fn.length} arguments`
      errors_.bundle(message, { inputArgs, fn: fn.toString() })
    }
  }
}

const minimumRequiredArgs = (args = '') => {
  if (args instanceof Array) args = args.join(' ')
  const requiredArgs = args.match(/<[\w-]+>/g)
  return requiredArgs != null ? requiredArgs.length : 0
}
