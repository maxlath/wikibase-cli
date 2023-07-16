import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'ss',
  args: '<entity> <site> <title> [badges]',
  description: 'set a sitelink on an entity for a given site',
  options: editCommandsOptions,
  examples: [
    { args: 'Q4115189 enwikiquote "The Sandbox"', comment: "Link Q4115189 to the article 'The Sandbox' on the English Wikiquote" },
    { args: 'Q4115189 enwikiquote "The Sandbox" Q17437796,Q17437798', comment: 'Also set badges for that sitelink' },
  ],
}
