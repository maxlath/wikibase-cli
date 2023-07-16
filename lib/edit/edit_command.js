import { inspect } from 'node:util'
import split from 'split'
import wbEdit from 'wikibase-edit'
import { red } from '#lib/chalk'
import { config } from '../config/config.js'
import errors_ from '../errors.js'
import program from '../program.js'
import assertCredentials from './assert_credentials.js'
import parseBatchLine from './parse_batch_line.js'
import parseObjectValue from './parse_object_value.js'

export async function execEditCommand (section, action) {
  let name
  if (typeof section === 'object') {
    // Pass a name when it can not be deduced from the wikibase-edit section
    // and action name, typically when a command uses a wikibase-edit function
    // but with a different name
    ;({ name, section, action } = section)
  } else {
    name = `${action}-${section}`
  }
  await program.process(name)

  if (program.showHelp) return program.customHelpOption()

  if (!program.instance) {
    return errors_.exitMessage('missing instance', instanceHint)
  }

  if (program.instance) config.instance = program.instance
  config.instance = config.instance.replace('/w/api.php', '')

  const { args, batch, exitOnError = true, dry } = program

  const { instance, credentials } = config

  if (!dry) await assertCredentials({ instance, credentials, batch })

  if (batch) {
    if (program.instance === 'https://www.wikidata.org') {
      program.editGroup = randomKey()
      const editGroupUrl = getEditGroupUrl('https://tools.wmflabs.org/', program.editGroup)
      process.stderr.write(`edit group: ${editGroupUrl}\n`)
    }
    // Args will be taken line-by-line on stdin instead
    runInBatch(section, action, exitOnError)
  } else {
    try {
      await runOnce(section, action, args)
    } catch (err) {
      logErrorAndExit(err)
    }
  }
}

const instanceHint = `* Wikidata: use the 'wd' executable
* other Wikibase instances:
  * set the '--instance <http://my.instance>' option
  * or set the instance in config: 'wb config instance http://my.instance'`

async function runOnce (section, action, args) {
  // Allow to define a customArgsParser on program to convert the command-line input
  // into what the wikibase-edit interface expects.
  // Running this after program.process allows to pass after the options
  // where removed from the args array
  if (program.customArgsParser) {
    args = await program.customArgsParser(args)
  }

  // Resolve arguments that might be promises
  // Known cases: ./object_arg_parser might get a JS function returning a promise
  args = await Promise.all(args)
  return runEditCommand(section, action, args)
}

// Use a single config object in batch mode
// to be able to not re-request tokens all the time
// and keep cached data such as properties
let wbEditConfig

async function runEditCommand (section, action, args) {
  if (program.dry) {
    if (args.length > 0) console.log(JSON.stringify({ section, action, args }))
    return
  }

  args = args.map(parseObjectValue)

  wbEditConfig = wbEditConfig || getWbEditConfig()

  if (args.length === 1 && args[0] instanceof Array) {
    const subCommandsArgs = args[0]
    for (const subCommandArg of subCommandsArgs) {
      const res = await wbEdit(wbEditConfig)[section][action](subCommandArg)
      console.log(JSON.stringify(res))
    }
  } else {
    const res = await wbEdit(wbEditConfig)[section][action](...args)
    console.log(JSON.stringify(res))
  }
}

function getWbEditConfig () {
  const { editGroup } = program
  let { summary, baserevid, maxlag } = program

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

  if (maxlag != null) {
    if (!/^-?\d+$/.test(maxlag)) throw new Error('invalid maxlag value')
    maxlag = parseInt(maxlag)
  } else {
    maxlag = config.maxlag
  }

  if (typeof baserevid === 'string') baserevid = parseInt(baserevid)

  return {
    instance,
    credentials: { oauth, username, password },
    summary,
    baserevid,
    tags,
    bot: config.bot,
    maxlag,
    // maxlag=-1 can be used for testing that passing maxlag does work
    autoRetry: maxlag !== -1,
  }
}

function runInBatch (section, action, exitOnError) {
  let counter = 0
  let successes = 0
  let errors = 0
  process.stdin
  .pipe(split())
  .on('data', async function (line) {
    try {
      line = line.trim()
      if (line === '') return
      this.pause()
      const errLog = errors > 0 ? ` (errors in previous lines: ${errors})` : ''
      process.stderr.write(`processing line ${++counter}: ${line}${errLog}\n`)
      try {
        const lineArgs = parseBatchLine(line)
        // Combine arguments passed inline and on stdin
        const args = program.args.concat(lineArgs)
        await runOnce(section, action, args)
        successes++
      } catch (err) {
        errors++
        if (exitOnError) logErrorAndExit(err)
        else if (err.code === 'EMPTY_PARAMS') console.error('produced an empty parameters object: passing')
        else console.error(`error triggered by line: "${line}":`, err)
      }
      this.resume()
    } catch (err) {
      this.emit('error', err)
    }
  })
  .on('close', () => {
    process.stderr.write(`done processing ${counter} lines: successes=${successes} errors=${errors}\n`)
  })
  .on('error', logErrorAndExit)
}

const getEditGroupUrl = (host, key) => `${host}editgroups/b/wikibase-cli/${key}/`

const randomKey = () => Math.random().toString(16).slice(2)

// Show the full error object
const logErrorAndExit = err => {
  if (err.statusCode === 400) {
    console.error(red(err.message), err.context)
  } else if (err.body && err.body.error && err.body.error.messages) {
    err.body.error.messages.forEach(message => {
      console.error(`${red(message.name)}\n${JSON.stringify(message, null, 2)}`)
    })
  } else {
    // util.inspect doc: https://nodejs.org/api/util.html#util_util_inspect_object_options
    console.error(inspect(err, { depth: null, maxArrayLength: null }))
  }
  process.exit(1)
}
