const program = require('../program')
const wdEdit = require('wikidata-edit')
const { inspect } = require('util')

module.exports = (section, action) => {
  const name = `${action}-${section}`
  program.process(name)

  if (program.args.length === 0) return program.help()

  const config = require('../config/config')

  const cmd = () => {
    const { verbose } = program
    const wdEditConfig = {
      username: config.username,
      password: config.password,
      verbose
    }
    return wdEdit(wdEditConfig)[section][action].apply(null, program.args)
    .then(res => {
      if (!program.quiet) console.log(res)
    })
  }

  require('./assert_credentials')(config)
  .then(cmd)
  .catch(logDeepError)
}

// Show the full error object
const logDeepError = (err) => {
  // util.inspect doc: https://nodejs.org/api/util.html#util_util_inspect_object_options
  console.error(inspect(err, { depth: null, maxArrayLength: null }))
  process.exit(1)
}
