import errors_ from './errors.js'
import validateFunctionArgs from './validate_function_args.js'

export async function executeFunction (absoluePath, inputArgs) {
  let { default: fn } = await import(absoluePath)
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
