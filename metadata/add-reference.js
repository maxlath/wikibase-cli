import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'ar',
  args: '<claim-guid> <property> <value>',
  description: 'Add a reference to a claim',
  options: editCommandsOptions,
  examples: [
    { args: "'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P854 'https://example.org/rise-and-box-of-the-holy-sand-box'", comment: 'Add a reference URL (P854) to this claim' },
    { args: "'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P143 Q60856", comment: 'Reference the claim as imported from (P143) Wikipedia in Uyghur (Q60856)' },
  ],
}
