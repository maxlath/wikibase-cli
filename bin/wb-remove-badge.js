#!/usr/bin/env node
import program from 'commander'
import { commandWithTemplateCustomHelp } from '#lib/command_with_template_custom_help'
import { badgesCommandArgsParser } from '#lib/common_command_args_parser'
import { execEditCommand } from '#lib/edit/edit_command'
import { polymorphicCommandArgsParser } from '#lib/polymorphic_command_args_parser'

program.customArgsParser = polymorphicCommandArgsParser({
  inlineArgsParser: badgesCommandArgsParser,
})
program.customHelpOption = commandWithTemplateCustomHelp
execEditCommand('badge', 'remove')
