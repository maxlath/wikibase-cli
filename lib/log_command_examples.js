const chalk = require('chalk')

module.exports = (command, examples, doc) => () => {
  if (examples && examples.length > 0) {
    console.log('\n  Examples:')
    examples.forEach(example => {
      const { args, comment, creationWarning } = example
      console.log(chalk.dim(`\n    # ${comment}`))
      if (creationWarning) console.log(chalk.red(`    # /!\\ Do not run this example command as it would create a junk item`))
      console.log(`    wb ${command} ${args}`)
    })
  }
  if (doc) console.log(`\n  Documentation: ${doc}`)
}
