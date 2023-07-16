import { entityAttributeCommandsOptions } from '#lib/common_options'

export default {
  alias: 'a',
  args: '<entity>',
  description: "display the entity's aliases",
  options: entityAttributeCommandsOptions,
  examples: [
    { args: 'Q123', comment: 'fetch the aliases for the entity Q123' },
    { args: 'Q123 --lang ja', comment: 'fetch the aliases for the entity Q123 in Japanese' },
  ],
}
