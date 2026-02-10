import { entityAttributeCommandsOptions } from '#lib/common_options'

export default {
  alias: 'l',
  args: '<entity>',
  description: "Display the entity's label",
  options: entityAttributeCommandsOptions,
  examples: [
    { args: 'Q123', comment: 'Fetch the label for the entity Q123' },
    { args: 'Q123 --lang ja', comment: 'Fetch the label for the entity Q123 in Japanese' },
    { args: 'Q1 Q2 Q3 P6', comment: 'Fetch labels for several entities' },
  ],
}
