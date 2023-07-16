#!/usr/bin/env node
import program from 'commander'
import { commandWithTemplateCustomHelp } from '#lib/command_with_template_custom_help'
import { execEditCommand } from '#lib/edit/edit_command'
import { objectArgParser } from '#lib/object_arg_parser'

program.customArgsParser = objectArgParser

program.customHelpOption = commandWithTemplateCustomHelp
execEditCommand('entity', 'create')
