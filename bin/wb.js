#!/usr/bin/env node
import fs from 'node:fs'
import path, { resolve } from 'node:path'
import program from 'commander'
import { debug } from '#lib/debug'
import { getDirname } from '#lib/fs'
import { readJsonFile } from '#lib/json'

const dirname = getDirname(import.meta.url)
const pkg = readJsonFile(resolve(dirname, '../package.json'))

program.version(pkg.version)
program.description(pkg.description)

debug('program:metadata', { name: pkg.name, version: pkg.version })

// To add a new command, create a file in ../metadata/${new-command-name}
// and add an executable at ./wb-${new-command-name}

const commandsNames = fs.readdirSync(path.resolve(dirname, '../metadata'))
  .map(filename => filename.replace('.js', ''))

await Promise.all(commandsNames.map(async commandName => {
  const { default: metadata } = await import(`../metadata/${commandName}.js`)
  const { alias, args, description } = metadata
  program.command(`${commandName} ${args}`, description)
  if (alias) program.alias(alias)
}))

program.parse(process.argv)
