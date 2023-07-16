import { entityAttributeCommandsOptions } from '#lib/common_options'

export default {
  args: '<lexeme>',
  description: "display the lexeme's lemma",
  options: entityAttributeCommandsOptions,
  examples: [
    { args: 'L525', comment: 'fetch the lemma for the lexeme L525' },
    { args: 'L525 --lang ja', comment: 'fetch the lemma for the lexeme L525 in Japanese' },
  ],
}
