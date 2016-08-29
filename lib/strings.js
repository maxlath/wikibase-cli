module.exports = {
  label: {
    args: '<entity>',
    description: 'display the entity or property label'
  },
  claims: {
    args: '<entity> [property]',
    description: 'display the claims of an entity'
  },
  data: {
    args: '<entity>',
    description: "output the entity's data"
  },
  props: {
    args: '',
    description: 'output the list of all Wikidata properties'
  },
  wikiqid: {
    args: '<title>',
    description: 'get a Wikidata id from a Wikipedia article title'
  },
  sparql: {
    args: '<file.rq>',
    description: 'run a SPARQL query and get its JSON output'
  },
  graph: {
    args: '',
    description: "generate and run a simple SPARQL query by passing a statement's subject, property, or object, or a couple of those"
  },
  open: {
    args: '<entity>',
    description: "open the entity's page on Wikidata website"
  }
}
