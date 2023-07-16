#!/usr/bin/env node
import program from 'commander'
import { isGuid } from 'wikibase-sdk'
import { commandWithTemplateCustomHelp } from '#lib/command_with_template_custom_help'
import { execEditCommand } from '#lib/edit/edit_command'
import { parseGuid } from '#lib/parse_command_utils'
import { polymorphicCommandArgsParser } from '#lib/polymorphic_command_args_parser'

const inlineArgsParser = args => {
  let data
  if (isGuid(parseGuid(args[0]))) {
    let [ guid, newValue ] = args
    guid = parseGuid(guid)
    data = { guid, newValue }
  } else {
    const [ id, property, oldValue, newValue ] = args
    data = { id, property, oldValue, newValue }
  }
  if (program.rank) data.rank = program.rank
  return [ data ]
}
program.customArgsParser = polymorphicCommandArgsParser({ inlineArgsParser })
program.customHelpOption = commandWithTemplateCustomHelp
execEditCommand('claim', 'update')
