import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'rs',
  args: '<entity> <site>',
  description: 'Remove a sitelink on an entity for a given site',
  options: editCommandsOptions,
  examples: [
    { args: 'Q4115189 enwikiquote', comment: 'Remove the link from Q4115189 to any article in the English Wikiquote' },
  ],
}
