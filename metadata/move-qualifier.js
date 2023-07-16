import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'mq',
  args: '<guid> [hash] <old-property-id> <new-property-id>',
  description: 'move qualifiers of a claim from one property to another',
  options: editCommandsOptions,
  examples: [
    { args: "'Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F' P2310 P2311", comment: 'move all P2310 qualifiers of this claim to P2311' },
    { args: "'Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F' 90b9b567dc01112e7d9dee98eb5f5ad50ae803bb P2310 P2311", comment: 'move only the P2310 qualifier with this hash to P2311' },
  ],
}
