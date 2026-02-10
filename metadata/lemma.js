import { entityAttributeCommandsOptions } from '#lib/common_options'

export default {
  args: '<lexeme>',
  description: "Display the lexeme's lemma",
  options: entityAttributeCommandsOptions,
  examples: [
    { args: 'L525', comment: 'Fetch the lemma for the lexeme L525' },
    { args: 'L525 --lang ja', comment: 'Fetch the lemma for the lexeme L525 in Japanese' },
  ],
}
