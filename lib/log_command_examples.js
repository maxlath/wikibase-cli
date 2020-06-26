const { grey } = require('chalk')
const { execSync } = require('child_process')

module.exports = (command, examples, doc, dryRun = false) => {
  if (examples && examples.length > 0) {
    console.log('\n  Examples:')
    for (const example of examples) {
      let { args, comment } = example
      if (args instanceof Array) args = args.join(' ')
      if (comment) console.log(grey(`\n    # ${comment}`))
      const cmd = `wb ${command} ${args}`
      console.log(`    ${cmd}`)
      if (dryRun) {
        const generatedData = execSync(`${cmd} --dry`).toString()
        console.log(grey(`    # =>`))
        console.log(formatJson(generatedData))
        console.log('')
      }
    }
  }
  if (doc) console.log(`\n  Documentation: ${doc}`)
  console.log('')
}

const formatJson = (json) => {
  return JSON.stringify(JSON.parse(json), null, 2)
  .split('\n')
  .map(line => '    ' + line)
  .join('\n')
}
