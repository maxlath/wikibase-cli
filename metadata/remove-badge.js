import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'rb',
  args: '<entity> <site> [badges]',
  description: 'Remove badges on an existing sitelink',
  options: editCommandsOptions,
  examples: [
    { args: 'Q4115189 enwikiquote Q17437796,Q17437798', comment: 'Remove Q17437796 and Q17437798 badges on Q4115189 enwikiquote sitelink' },
  ],
}
