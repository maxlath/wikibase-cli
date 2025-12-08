#!/usr/bin/env node
import program from 'commander'
import { commandWithTemplateCustomHelp } from '#lib/command_with_template_custom_help'
import { execEditCommand } from '#lib/edit/edit_command'
import { parseReconciliationArg } from '#lib/edit/reconciliation'
import { polymorphicCommandArgsParser } from '#lib/polymorphic_command_args_parser'

const inlineArgsParser = ([ id, property, value ]) => {
  const data = { id, property, value }
  const { rank, reconciliation } = program
  if (rank) data.rank = rank
  if (reconciliation) data.reconciliation = parseReconciliationArg(reconciliation)
  return [ data ]
}
program.customArgsParser = polymorphicCommandArgsParser({ inlineArgsParser })
program.customHelpOption = commandWithTemplateCustomHelp
execEditCommand('claim', 'add')
