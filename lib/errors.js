import { red } from '#lib/chalk'

const errors_ = {
  new: (message, context) => {
    const err = new Error(message)
    err.context = context
    return err
  },
  exit: (err, brief) => {
    if (brief) {
      console.error(red(err.stack || err))
    } else {
      const context = JSON.stringify(err.context)
      console.error(red('%s\nContext: %s'), err.stack || err, context)
      if (err.headers) console.error(red('Response Headers'), err.headers)
      if (err.body) console.error(red('Response Body'), err.body)
    }
    process.exit(1)
  },
  exitMessage: (errMessage, hint) => {
    console.error(red(errMessage))
    if (hint) console.error(hint)
    process.exit(1)
  },
  bundle: (message, context) => {
    const err = errors_.new(message, context)
    errors_.exit(err)
  },
}

export default errors_
