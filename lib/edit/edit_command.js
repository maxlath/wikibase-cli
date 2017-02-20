const program = require('../program')
const wdEdit = require('wikidata-edit')
const { red } = require('chalk')

module.exports = (name, section, action) => {
  program.process(name)

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
    .catch(err => {
      console.error(red(err.message))
      process.exit(1)
    })
  }

  require('./assert_credentials')(config)
  .then(cmd)
  .catch(console.error)
}
