const chalk = require('chalk')

module.exports = {
  new: (message, context) => {
    var err = new Error(message)
    err.context = context
    return err
  },
  log: (err, brief) => {
    if (brief) {
      console.error(chalk.red(err.stack || err))
    } else {
      console.error(chalk.red('%s\nContext:\n%s'), err.stack || err, err.context)
    }
    process.exit(1)
  }
}
