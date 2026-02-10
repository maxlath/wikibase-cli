import { editCommandsOptions } from '#lib/common_options'

export default {
  alias: 'aq',
  args: '<claim-guid> <property> <value>',
  description: 'Add a qualifier to a claim',
  options: editCommandsOptions,
  examples: [
    { args: "'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P155 'Q13406268'", comment: 'Entity qualifier' },
    { args: "'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P1545 'A-123'", comment: 'String qualifier' },
    { args: "'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P580 '1802-02-26'", comment: 'Time qualifier' },
    { args: "'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P2130 123", comment: 'Quantity qualifier' },
    { args: "'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P2130 '{\"amount\":123,\"unit\":\"Q4916\"}'", comment: 'Quantity qualifier with a unit' },
    { args: "'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P3132 \"text=les sanglots long des violons de l'automne&language=fr\"", comment: 'Monolingualtext qualifier' },
  ],
}
