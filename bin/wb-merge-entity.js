#!/usr/bin/env node
import program from 'commander'
import { commandWithTemplateCustomHelp } from '#lib/command_with_template_custom_help'
import { execEditCommand } from '#lib/edit/edit_command'
import { polymorphicCommandArgsParser } from '#lib/polymorphic_command_args_parser'

const inlineArgsParser = args => {
  if (program.keepOldest) {
    const [ newest, oldest ] = getSortedEntitiesIds(args)
    return [ { from: newest, to: oldest } ]
  } else {
    return [ { from: args[0], to: args[1] } ]
  }
}

const getSortedEntitiesIds = args => {
  return args
  .slice(0, 2)
  .sort((a, b) => getNumericId(b) - getNumericId(a))
}

const getNumericId = id => parseInt(id.replace(/^[A-Z]+/i, ''))

program.customArgsParser = polymorphicCommandArgsParser({ inlineArgsParser })
program.customHelpOption = commandWithTemplateCustomHelp
execEditCommand('entity', 'merge')
