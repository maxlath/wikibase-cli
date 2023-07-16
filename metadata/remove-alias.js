import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'ra',
  args: '<entity> <language> <aliases>',
  description: 'remove one or several aliases from the list of aliases of an entity in a given language',
  options: editCommandsOptions,
  examples: [
    { args: 'Q4115189 fr foo', comment: "remove 'foo' from the Sandbox entity (Q4115189) French aliases" },
    { args: 'Q4115189 fr "foo|bar|buzz', comment: "remove 'foo', 'bar', and 'buzz' from the Sandbox entity (Q4115189) French aliases" },
  ],
}
