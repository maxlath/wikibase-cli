const { editCommands } = require('./common_options')

module.exports = {
  args: '<data>',
  description: 'Edit an existing entity',
  options: Object.assign({}, editCommands, { dry: true }),
  examples: [
    {
      args: "'{\"id\":\"Q4115189\",\"labels\":{\"en\":\"a label\",\"fr\":\"un label\"},\"descriptions\":{\"en\":\"some description\",\"fr\":\"une description\"},\"claims\":{\"P1775\":[\"Q3576110\",\"Q12206942\"],\"P2002\":\"bulgroz\"}}'",
      comment: 'pass data as JSON'
    },
    {
      args: './existing_item_data.json',
      comment: 'pass data as a JSON file path'
    },
    {
      args: './existing_item_data.js',
      comment: 'pass data from a JS module exporting an object'
    },
    {
      args: './existing_item_data.js Q123 abc 456',
      comment: 'pass data from a JS module exporting a function (the additional arguments will be passed to the function)'
    },
    {
      args: './existing_item_data.json --instance http://some/wikibase/instance/w/api.php --sparql-endpoint http://some/sparql/endpoint',
      comment: 'in case you use are not editing wikidata.org, make sure to specify the custom Wikibase instance and its SPARQL endpoint, as claims formatting and validation will depend on properties types that are retrieved from the SPARQL endpoint'
    }
  ]
}
