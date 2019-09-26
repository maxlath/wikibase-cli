module.exports = {
  alias: 'uq',
  args: '<claim-guid> <property> <old-value> <new-value>',
  description: 'update a qualifier from an existing value to a new value',
  options: require('../lib/common_options').editCommands,
  examples: [
    { args: "'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P155 'Q13406268' 'Q3576110'", comment: 'entity qualifier' },
    { args: "'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P1545 'A-123' 'B-123'", comment: 'string qualifier' },
    { args: "'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P580 '1802-02-26' ''1802-02-27'", comment: 'time qualifier' },
    { args: "'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P2130 123 124", comment: 'quantity qualifier' },
    { args: "'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P2130 'amount=123&unit=Q4916' 'amount=124&unit=Q4916'", comment: 'quantity qualifier with a unit' },
    { args: "'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P3132 'text=aaah&language=fr' 'text=ach sooo&language=de'", comment: 'monolingualtext qualifier' }
  ]
}
