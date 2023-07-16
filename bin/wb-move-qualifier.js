#!/usr/bin/env node
import program from 'commander'
import { isHash } from 'wikibase-sdk'
import { commandWithTemplateCustomHelp } from '#lib/command_with_template_custom_help'
import { execEditCommand } from '#lib/edit/edit_command'
import { parseGuid } from '#lib/parse_command_utils'
import { polymorphicCommandArgsParser } from '#lib/polymorphic_command_args_parser'

const inlineArgsParser = args => {
  let [ guid, hash, oldProperty, newProperty ] = args
  guid = parseGuid(guid)
  if (isHash(hash)) {
    return [ { guid, hash, oldProperty, newProperty } ]
  } else {
    ([ oldProperty, newProperty ] = [ hash, oldProperty ])
    return [ { guid, oldProperty, newProperty } ]
  }
}
program.customArgsParser = polymorphicCommandArgsParser({ inlineArgsParser })
program.customHelpOption = commandWithTemplateCustomHelp
execEditCommand('qualifier', 'move')
