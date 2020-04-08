const program = require('../program')
const wbEdit = require('wikibase-edit')
const { inspect } = require('util')
const { red } = require('chalk')
const parseObjectValue = require('./parse_object_value')
const parseBatchLine = require('./parse_batch_line')
const split = require('split')
const config = require('../config/config')
const errors_ = require('../errors')

module.exports = (section, action) => {
  const name = `${action}-${section}`
  program.process(name)

  if (!program.instance) {
    return errors_.exitMessage('missing instance', instanceHint)
  }

  let { args, batch } = program
  if (batch) {
    if (program.instance === 'https://www.wikidata.org') {
      program.editGroup = randomKey()
      const editGroupUrl = getEditGroupUrl('https://tools.wmflabs.org/', program.editGroup)
      process.stderr.write(`edit group: ${editGroupUrl}\n`)
    }
    // Args will be taken line-by-line on stdin instead
    runInBatch(section, action)
  } else {
    runOnce(section, action, args)
  }
}

const instanceHint = `* Wikidata: use the 'wd' executable
* other Wikibase instances:
  * set the '--instance <http://my.instance>' option
  * or set the instance in config: 'wb config instance http://my.instance'`

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

// Use a single config object in batch mode
// to be able to not re-request tokens all the time
// and keep cached data such as properties
let wbEditConfig

const runEditCommand = (section, action, args) => {
  if (program.dry) return console.log(JSON.stringify(args[0]))

  try {
    args = args.map(parseObjectValue)
  } catch (err) {
    logDeepError(err)
  }

  const cmd = () => {
    wbEditConfig = wbEditConfig || getWbEditConfig()
    return wbEdit(wbEditConfig)[section][action].apply(null, args)
    .then(res => console.log(JSON.stringify(res)))
  }

  if (program.instance) config.instance = program.instance
  config.instance = config.instance.replace('/w/api.php', '')

  return require('./assert_credentials')(config)
  .then(cmd)
  .catch(logDeepError)
}

const getWbEditConfig = () => {
  const { editGroup } = program
  let { summary } = program

  if (editGroup) {
    const compactEditGroupUrl = getEditGroupUrl(':toollabs:', editGroup)
    summary = summary || ''
    summary += ` ([[${compactEditGroupUrl}|details]])`
    summary = summary.trim()
  }

  const { instance, credentials } = config
  const { oauth, username, password } = credentials[instance]

  let tags
  if (instance === 'https://www.wikidata.org') tags = [ 'WikibaseJS-cli' ]

  return {
    instance,
    credentials: { oauth, username, password },
    summary,
    tags,
    bot: config.bot
  }
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
  .on('data', async function (line) {
    try {
      line = line.trim()
      if (line === '') return
      this.pause()
      process.stderr.write(`processing line ${++counter}: ${line}\n`)
      const lineArgs = parseBatchLine(line)
      await runOnce(section, action, lineArgs)
      this.resume()
    } catch (err) {
      this.emit('error', err)
    }
  })
  .on('close', () => {
    process.stderr.write(`done processing ${counter} lines\n`)
  })
  .on('error', console.error)
}

const getEditGroupUrl = (host, key) => `${host}editgroups/b/wikibase-cli/${key}/`

const randomKey = () => Math.random().toString(16).slice(2)
