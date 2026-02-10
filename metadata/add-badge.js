import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'ab',
  args: '<entity> <site> [badges]',
  description: 'Add badges on an existing sitelink, without removing other badges that might already have been set',
  options: editCommandsOptions,
  examples: [
    { args: 'Q4115189 enwikiquote Q17437796,Q17437798', comment: 'Add Q17437796 and Q17437798 badges on Q4115189 enwikiquote sitelink' },
  ],
}
