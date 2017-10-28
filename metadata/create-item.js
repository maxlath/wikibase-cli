module.exports = {
  args: '<data>',
  description: 'Create a new item from the passed data',
  options: require('./common_options').editCommands,
  examples: [
    {
      args: "'{\"labels\":{\"en\":\"a label\",\"fr\":\"un label\"},\"descriptions\":{\"en\":\"some description\",\"fr\":\"une description\"},\"claims\":{\"P1775\":[\"Q3576110\",\"Q12206942\"],\"P2002\":\"bulgroz\"}}'",
      comment: 'pass data as JSON',
      creationWarning: true
    },
    {
      args: './new_item_data.json',
      comment: 'pass data as a JSON file path'
    }
  ]
}
