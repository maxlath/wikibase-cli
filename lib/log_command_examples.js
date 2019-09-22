const chalk = require('chalk')

module.exports = (command, examples, doc) => () => {
  if (examples && examples.length > 0) {
    console.log('\n  Examples:')
    examples.forEach(example => {
      const { args, comment } = example
      console.log(chalk.dim(`\n    # ${comment}`))
      console.log(`    wb ${command} ${args}`)
    })
  }
  if (doc) console.log(`\n  Documentation: ${doc}`)
}
