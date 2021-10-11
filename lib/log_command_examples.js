const { grey } = require('chalk')
const { execSync } = require('child_process')

module.exports = (command, examples, doc, dryRun = false) => {
  if (examples && examples.length > 0) {
    console.log('\nExamples:')
    for (const example of examples) {
      let { args, comment } = example
      if (args instanceof Array) args = args.join(' ')
      if (comment) console.log(grey(`\n  # ${comment}`))
      const cmd = `wb ${command} ${args}`
      console.log(`  ${cmd}`)
      if (dryRun && example.dryRun !== false) {
        const generatedData = execSync(`${cmd} --dry`).toString()
        console.log(grey('  # output:'))
        if (command.startsWith('sparql')) console.log(formatSparql(generatedData))
        else console.log(formatJsonInMixedOutput(generatedData))
        console.log('')
      }
    }
  }
  if (doc) console.log(`\nDocumentation: ${doc}`)
  console.log('')
}

const indent = line => '  ' + line

const formatJsonInMixedOutput = output => {
  return output
  .split('\n')
  .filter(isValidJson)
  .map(formatJson)
  .join('\n')
}

const formatJson = json => {
  return JSON.stringify(JSON.parse(json), null, 2)
  .split('\n')
  .map(indent)
  .join('\n')
}

const formatSparql = sparql => {
  return sparql
  .split('\n')
  .map(indent)
  .join('\n')
}

const isValidJson = line => {
  try {
    JSON.parse(line)
    return true
  } catch (err) {
    return false
  }
}
