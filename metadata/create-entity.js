const { editCommands } = require('../lib/common_options')

module.exports = {
  alias: 'ce',
  args: '<data>',
  description: 'Create a new entity',
  options: Object.assign({}, editCommands, { dry: true }),
  examples: [
    {
      args: "'{\"labels\":{\"en\":\"a label\",\"fr\":\"un label\"},\"descriptions\":{\"en\":\"some description\",\"fr\":\"une description\"},\"claims\":{\"P1775\":[\"Q3576110\",\"Q12206942\"],\"P2002\":\"bulgroz\"}}'",
      comment: 'pass data as JSON'
    },
    {
      args: './new_entity_data.json',
      comment: 'pass data as a JSON file path'
    },
    {
      args: './new_entity_data.json --instance http://some/wikibase/instance/w/api.php --sparql-endpoint http://some/sparql/endpoint',
      comment: 'in case you use are not editing wikidata.org, make sure to specify the custom Wikibase instance and its SPARQL endpoint, as claims formatting and validation will depend on properties types that are retrieved from the SPARQL endpoint'
    }
  ]
}
