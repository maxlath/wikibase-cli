import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'rd',
  args: '<entity> <language>',
  description: 'Remove a description on an entity for a given language',
  options: editCommandsOptions,
  examples: [
    { args: 'Q4115189 it', comment: 'Remove Q4115189 description in Italian' },
  ],
}
