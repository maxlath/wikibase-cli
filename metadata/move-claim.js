import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'mc',
  args: '<guid|property-claims-id> <target-entity-id> <target-property-id>',
  description: 'move claims from an entity to another and/or from a property to another',
  options: editCommandsOptions,
  examples: [
    { args: "'Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F' Q4115189 P20", comment: 'change the property of a claim (without changing entity)' },
    { args: "'Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F' Q13406268 P19", comment: 'move the claim to another entity (without changing the property)' },
    { args: "'Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F' Q13406268 P20", comment: 'move the claim to another entity and another property' },
    { args: "'Q4115189#P19' Q4115189 P20", comment: 'move all Q4115189 P19 claims to P20 (without changing entity)' },
    { args: "'Q4115189#P19' Q13406268 P19", comment: 'move all Q4115189 P19 claims to Q13406268 (without changing the property)' },
    { args: "'Q4115189#P19' Q13406268 P20", comment: 'move all Q4115189 P19 claims to Q13406268 P20' },
  ],
}
