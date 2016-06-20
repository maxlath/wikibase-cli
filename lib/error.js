module.exports = {
  new: (message, context) => {
    var err = new Error(message)
    err.context = context
    return err
  },
  log: (err) => {
    console.error(err.stack.red || err, '\nContext:\n', err.context)
    process.exit(1)
  }
}
