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
      const context = JSON.stringify(err.context)
      console.error(chalk.red('%s\nContext: %s'), err.stack || err, context)
      if (err.body) console.error(chalk.red('Response Body'), err.body)
    }
    process.exit(1)
  },
  bundle: (message, context) => {
    const err = error_.new(message, context)
    error_.exit(err)
  }
}

module.exports = error_
