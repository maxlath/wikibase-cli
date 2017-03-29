const chalk = require('chalk')

module.exports = (command, examples) => () => {
  if (!(examples && examples.length > 0)) return
  console.log('  Examples:')
  examples.forEach((example) => {
    const args = example.args
    const comment = example.comment
    console.log(chalk.dim(`\n    # ${comment}`))
    console.log(`    $ wd ${command} ${args}`)
  })
}
