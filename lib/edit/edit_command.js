const program = require('../program')
const wbEdit = require('wikibase-edit')
const { inspect } = require('util')
const { red } = require('chalk')
const parseObjectValue = require('./parse_object_value')
const split = require('split')
const through = require('through')

module.exports = (section, action) => {
  const name = `${action}-${section}`
  program.process(name)

  if (!program.instance) throw new Error('missing instance')

  let { args, batch } = program
  if (batch) {
    // Args will be taken line-by-line on stdin instead
    runInBatch(section, action)
  } else {
    runOnce(section, action, args)
  }
}

const runOnce = (section, action, args) => {
  // Allow to define a customArgsParser on program to convert the command-line input
  // into what the wikibase-edit interface expects.
  // Running this after program.process allows to pass after the options
  // where removed from the args array
  if (program.customArgsParser) {
    args = program.customArgsParser(args)
  }

  // Resolve arguments that might be promises
  // Known cases: ./entity_command_args_parser might get a JS function returning a promise
  if (section === 'entity') {
    return Promise.all(args)
    .then(runEditCommand.bind(null, section, action))
  } else {
    return runEditCommand(section, action, args)
  }
}

const runEditCommand = (section, action, args) => {
  if (program.dry) return console.log(JSON.stringify(args[0]))

  try {
    args = args.map(parseObjectValue)
  } catch (err) {
    logDeepError(err)
  }

  const config = require('../config/config')

  const cmd = () => {
    const { verbose } = program
    const { instance, credentials } = config
    const { oauth, username, password } = credentials[instance]
    const wbEditConfig = {
      instance,
      credentials: { oauth, username, password },
      summary: '#wikibasejs/cli',
      bot: config.bot,
      verbose
    }
    return wbEdit(wbEditConfig)[section][action].apply(null, args)
    .then(res => {
      if (!program.quiet) console.log(JSON.stringify(res))
    })
  }

  if (program.instance) config.instance = program.instance
  config.instance = config.instance.replace('/w/api.php', '')

  return require('./assert_credentials')(config)
  .then(cmd)
  .catch(logDeepError)
}

// Show the full error object
const logDeepError = err => {
  if (err.statusCode === 400) {
    console.error(red(err.message), err.context)
  } else {
    // util.inspect doc: https://nodejs.org/api/util.html#util_util_inspect_object_options
    console.error(inspect(err, { depth: null, maxArrayLength: null }))
  }
  process.exit(1)
}

const runInBatch = (section, action) => {
  let counter = 0
  process.stdin
  .pipe(split())
  .pipe(through(async function (line) {
    line = line.trim()
    if (line === '') return
    this.pause()
    process.stderr.write(`processing line ${++counter}: ${line}\n`)
    const lineArgs = getArgsFromBatchLine(line)
    await runOnce(section, action, lineArgs)
    this.resume()
  }))
  .on('close', () => {
    process.stderr.write(`done processing ${counter} lines\n`)
  })
  .on('error', console.error)
}

const getArgsFromBatchLine = line => {
  // If the line starts by '{', its a JSON object and should not be splitted
  // (typically for a (create|edit)-entity command)
  // Else, split arguments on spaces
  if (line[0] === '{') {
    return [ line ]
  } else {
    return line.split(' ')
  }
}
