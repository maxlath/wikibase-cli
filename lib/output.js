const types = require('./types')

// Calling program just in time, so that code running
// after this first level function can still change the option
module.exports = program => (data, optional, customColors) => {
  const isArray = types.isArray(data)
  const isPlainObject = types.isPlainObject(data)
  const isCollection = types.isCollection(data)

  program.json = program.json || program.format === 'json'

  // Flatten when data is one array in an array to get a chance
  // to have a shell-friendly output
  if (isArray && data.length === 1 && types.isArray(data[0])) data = data[0]

  if (optional) {
    if (!program.verbose) return
    if (!customColors) data = require('chalk').grey(data)
    log(data)
  } else {
    if (isArray && !isCollection && !program.json) {
      if (program.format === 'inline') data = data.join(' ')
      else data = data.join('\n')
    } else if (isCollection && program.format === 'table') {
      data = require('./tabularize')(data)
    } else if (program.json || isCollection || isPlainObject) {
      // indent deep objects
      data = JSON.stringify(data, null, 2)
      // Do not copy to clipboard when the output is valid JSON
      program.clipboard = false
    }
    if (data == null || (isArray && data.length === 0)) {
      console.error('no result found')
      return process.exit(1)
    }
    if (program.clipboard) {
      require('./copy')(data)
    } else {
      log(data)
      process.exit(0)
    }
  }
}

const log = data => {
  if (typeof data === 'string') {
    if (!data.endsWith('\n')) data += '\n'
    process.stdout.write(data)
  } else {
    console.log(data)
  }
}
