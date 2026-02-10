import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'uc',
  args: '<guid> <new-value>',
  description: "Update a claim's value",
  options: Object.assign({ rank: true }, editCommandsOptions),
  examples: [
    { args: 'Q4115189$bc43ae33-7525-42cb-ad31-b1e1cf3cb72d Bulgroz', comment: "Update the claim identified by this id with the value 'Bulgroz'" },
    { args: 'Q4115189 P2002 Zorglub Bulgroz', comment: "Change the the Sandbox (Q4115189) Twitter account (P2002) from 'Zorglub' to 'Bulgroz'" },
  ],
}
