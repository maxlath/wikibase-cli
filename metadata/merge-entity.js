import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'me',
  args: '<from-id> <to-id>',
  description: 'Merge an entity into another',
  options: { keepOldest: true, ...editCommandsOptions },
  examples: [
    {
      args: 'Q1 Q2',
      comment: 'merge Q1 into Q2',
    },
  ],
}
