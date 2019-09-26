module.exports = {
  alias: 'rc',
  args: '<guids>',
  description: 'remove claims by their GUIDs',
  options: require('../lib/common_options').editCommands,
  examples: [
    { args: 'Q71$BD9A4A9F-E3F9-43D4-BFDB-484984A87FD7', comment: 'remove this claim made on Q71' }
  ]
}
