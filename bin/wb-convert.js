#!/usr/bin/env node
import { isPropertyId } from 'wikibase-sdk'
import convertIds from '#lib/convert_ids'
import errors_ from '#lib/errors'
import { getStdinInput } from '#lib/get_stdin_input'
import program from '#lib/program'

program.canHaveZeroArguments = true

await program
.option('-s, --subjects [subjects...]', 'set a subject')
.option('-p, --property <property>', 'set a property')
.option('-o, --objects [objects...]', 'set an object')
// --dry and --open options aren't trivial to implement
// as several requests might be run sequentially (instead of just one
// for commands implementing those options)
.process('convert')

const { subjects, property, objects } = program

if (!property) program.helpAndExit(0)

if (!isPropertyId(property)) {
  errors_.bundle('invalid property', { property })
}

if (subjects && objects) {
  errors_.exitMessage("subjects and objects can't be both specified")
}

const fromWdIds = subjects != null

let ids
if (subjects instanceof Array) ids = subjects
else if (objects instanceof Array) ids = objects

if (ids && ids.length > 0) {
  convertIds(property, ids, fromWdIds)
} else if (process.stdin.isTTY) {
  errors_.bundle('no ids provided', { property })
} else {
  let input = await getStdinInput()
  input = input.trim()
  let ids = input.split(/\s+/)
  if (ids.length === 1 && ids[0] === '') ids = []
  await convertIds(property, ids, fromWdIds)
}
