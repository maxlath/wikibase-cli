import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'sa',
  args: '<entity> <language> <aliases>',
  description: 'Set the list of aliases of an entity in a given language',
  options: editCommandsOptions,
  examples: [
    { args: 'Q4115189 fr foo', comment: "Replaces the Sandbox entity (Q4115189) French aliases by 'foo'" },
    { args: 'Q4115189 fr "foo|bar|buzz', comment: "Replaces the Sandbox entity (Q4115189) French aliases by foo', 'bar', and 'buzz'" },
  ],
}
