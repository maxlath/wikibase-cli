const chalk = require('chalk')

const errors_ = {
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
      if (err.headers) console.error(chalk.red('Response Headers'), err.headers)
      if (err.body) console.error(chalk.red('Response Body'), err.body)
    }
    process.exit(1)
  },
  bundle: (message, context) => {
    const err = errors_.new(message, context)
    errors_.exit(err)
  }
}

module.exports = errors_
