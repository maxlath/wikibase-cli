#!/usr/bin/env node
import program from 'commander'
import { commandWithTemplateCustomHelp } from '#lib/command_with_template_custom_help'
import { execEditCommand } from '#lib/edit/edit_command'
import { parseGuid } from '#lib/parse_command_utils'
import { polymorphicCommandArgsParser } from '#lib/polymorphic_command_args_parser'

const inlineArgsParser = guids => [ { guid: guids.map(parseGuid) } ]
program.customArgsParser = polymorphicCommandArgsParser({ inlineArgsParser })
program.customHelpOption = commandWithTemplateCustomHelp
execEditCommand('claim', 'remove')
