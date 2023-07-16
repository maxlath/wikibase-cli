import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'aa',
  args: '<entity> <language> <aliases>',
  description: 'add one or several aliases to the list of aliases of an entity in a given language',
  options: editCommandsOptions,
  examples: [
    { args: 'Q4115189 fr foo', comment: "add 'foo' to the Sandbox entity (Q4115189) French aliases" },
    { args: 'Q4115189 fr "foo|bar|buzz', comment: "add 'foo', 'bar', and 'buzz' to the Sandbox entity (Q4115189) French aliases" },
  ],
}
