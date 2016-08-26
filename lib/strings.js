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
    args: '[lang]',
    description: 'output the list of all Wikidata properties'
  },
  wikiqid: {
    args: '<title> [lang]',
    description: 'get a Wikidata id from a Wikipedia article title'
  },
  sparql: {
    args: '<file.rq>',
    description: 'run a SPARQL query and get its JSON output'
  }
}
