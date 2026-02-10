import { promisify } from 'node:util'
import { grey } from 'tiny-chalk'
import { copyAndExit } from '#lib/copy'
import { tabularize } from '#lib/tabularize'
import { isArray, isCollection, isPlainObject } from '#lib/types'

const stdoutWrite = promisify(process.stdout.write).bind(process.stdout)

// Calling program just in time, so that code running
// after this first level function can still change the option
export function outputFactory (program) {
  return async function (data, optional, customColors) {
    program.json = program.json || program.format === 'json'

    // Flatten when data is one array in an array to get a chance
    // to have a shell-friendly output
    if (isArray(data) && data.length === 1 && isArray(data[0])) data = data[0]

    if (optional) {
      if (!program.verbose) return
      if (!customColors) data = grey(data)
      await log(data)
    } else {
      if (isArray(data) && !isCollection(data) && !program.json) {
        if (program.format === 'inline') data = data.join(' ')
        else data = data.join('\n')
      } else if (isCollection(data) && program.format === 'table') {
        data = tabularize(data)
      } else if (program.json || isCollection(data) || isPlainObject(data)) {
      // indent deep objects
        data = JSON.stringify(data, null, 2)
        // Do not copy to clipboard when the output is valid JSON
        program.clipboard = false
      }
      if (data == null || (isArray(data) && data.length === 0)) {
        console.error('no result found')
        return process.exit(1)
      }
      if (program.clipboard) {
        copyAndExit(data)
      } else {
        await log(data)
        process.exit(0)
      }
    }
  }
}

async function log (data) {
  if (data === '') {
    return
  } else if (typeof data === 'string') {
    if (!data.endsWith('\n')) data += '\n'
    await stdoutWrite(data)
  } else {
    console.log(data)
  }
}
