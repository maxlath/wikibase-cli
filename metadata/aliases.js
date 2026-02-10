import { entityAttributeCommandsOptions } from '#lib/common_options'

export default {
  alias: 'a',
  args: '<entity>',
  description: "Display the entity's aliases",
  options: entityAttributeCommandsOptions,
  examples: [
    { args: 'Q123', comment: 'Fetch the aliases for the entity Q123' },
    { args: 'Q123 --lang ja', comment: 'Fetch the aliases for the entity Q123 in Japanese' },
  ],
}
