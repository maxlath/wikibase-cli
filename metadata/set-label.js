import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'sl',
  args: '<entity> <language> <label>',
  description: 'set a label on an entity in a given language',
  options: editCommandsOptions,
  examples: [
    { args: 'Q4115189 fr "Bac à sable bulgroz"', comment: "set the label 'Bac à sable bulgroz' to the Sandbox entity (Q4115189) in French" },
  ],
}
