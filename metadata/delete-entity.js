import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'de',
  args: '<id>',
  description: 'Delete an entity',
  options: editCommandsOptions,
  examples: [
    {
      args: 'Q1',
      comment: 'delete an item',
    },
    {
      args: 'P1',
      comment: 'delete a property',
    },
  ],
}
