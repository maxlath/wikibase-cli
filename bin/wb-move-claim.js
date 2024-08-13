#!/usr/bin/env node
import program from 'commander'
import { isPropertyClaimsId } from 'wikibase-sdk'
import { commandWithTemplateCustomHelp } from '#lib/command_with_template_custom_help'
import { execEditCommand } from '#lib/edit/edit_command'
import { parseGuid } from '#lib/parse_command_utils'
import { polymorphicCommandArgsParser } from '#lib/polymorphic_command_args_parser'

const inlineArgsParser = args => {
  let [ guid, id, property, newValue ] = args
  if (isPropertyClaimsId(guid)) {
    return [ { propertyClaimsId: guid, id, property, newValue } ]
  } else {
    guid = parseGuid(guid)
    return [ { guid, id, property, newValue } ]
  }
}
program.customArgsParser = polymorphicCommandArgsParser({ inlineArgsParser })
program.customHelpOption = commandWithTemplateCustomHelp
execEditCommand('claim', 'move')
