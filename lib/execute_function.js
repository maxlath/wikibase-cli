import errors_ from './errors.js'
import validateFunctionArgs from './validate_function_args.js'

export async function executeFunction (absoluePath, inputArgs) {
  const module = await import(absoluePath)
  const firstArg = inputArgs[0]
  let fn
  if (firstArg && typeof module[firstArg] === 'function') {
    fn = module[firstArg]
    inputArgs.shift()
  } else {
    fn = module.default
  }

  if (typeof fn !== 'function') throw new Error('function not found')

  let metadata

  if (fn && fn.template) {
    metadata = fn
    fn = fn.template
  }

  validateFunctionArgs(fn, inputArgs, metadata)

  try {
    const result = fn(...inputArgs)
    if (!result) errors_.exit("the passed function didn't return anything", true)
    return result
  } catch (err) {
    errors_.exit(err)
  }
}
