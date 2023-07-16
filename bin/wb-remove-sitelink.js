#!/usr/bin/env node
import program from 'commander'
import { commandWithTemplateCustomHelp } from '#lib/command_with_template_custom_help'
import { execEditCommand } from '#lib/edit/edit_command'
import { polymorphicCommandArgsParser } from '#lib/polymorphic_command_args_parser'

const inlineArgsParser = ([ id, site ]) => {
  return [ { id, site, title: null } ]
}
program.customArgsParser = polymorphicCommandArgsParser({ inlineArgsParser })
program.customHelpOption = commandWithTemplateCustomHelp
execEditCommand({
  name: 'remove-sitelink',
  section: 'sitelink',
  action: 'set',
})
