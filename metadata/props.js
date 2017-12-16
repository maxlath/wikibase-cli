module.exports = {
  args: '',
  description: 'output the list of all Wikidata properties',
  options: {
    lang: true,
    verbose: true,
    clipboard: true,
    json: true,
    instance: true,
    sparqlEndpoint: true
  },
  examples: [
    { args: '', comment: 'output all the properties' },
    { args: '--type', comment: 'output all the properties and their types' },
    { args: 'image', comment: 'filter the properties to keep only those with labels matching "image"' },
    { args: '--type Url', comment: 'filter the properties to keep only those of type Url (other possible types: ExternalId, String, WikibaseItem, WikibaseProperty, Time, Monolingualtext, Quantity, CommonsMedia, GlobeCoordinate)' },
    { args: '--lang sv', comment: 'output all the properties with their label in Swedish' },
    { args: '--reset', comment: 'delete all the cached properties files to get fresh versions on the next execution' }
  ]
}
