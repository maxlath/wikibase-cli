const errors_ = require('./errors')
const validateFunctionArgs = require('./validate_function_args')

module.exports = (absoluePath, inputArgs) => {
  let fn = require(absoluePath)
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
