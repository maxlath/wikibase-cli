import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'rl',
  args: '<entity> <language>',
  description: 'Remove a label on an entity for a given language',
  options: editCommandsOptions,
  examples: [
    { args: 'Q4115189 it', comment: 'Remove Q4115189 label in Italian' },
  ],
}
