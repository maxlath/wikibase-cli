const chalk = require('chalk')

const error_ = {
  new: (message, context) => {
    var err = new Error(message)
    err.context = context
    return err
  },
  exit: (err, brief) => {
    if (brief) {
      console.error(chalk.red(err.stack || err))
    } else {
      console.error(chalk.red('%s\nContext: %s'), err.stack || err, err.context)
    }
    process.exit(1)
  },
  bundle: (message, context) => {
    const err = error_.new(message, context)
    error_.exit(err)
  }
}

module.exports = error_
