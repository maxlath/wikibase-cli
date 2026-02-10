export default {
  alias: 'p',
  args: '',
  description: 'Output the list of all Wikidata properties',
  options: {
    lang: true,
    verbose: true,
    clipboard: true,
    json: true,
    instance: true,
    sparqlEndpoint: true,
  },
  examples: [
    { args: '', comment: 'Output all the properties and their labels' },
    { args: '--type', comment: 'Output all properties, with their labels, types' },
    { args: '--details', comment: 'Output all properties, with their labels, types, descriptions, and aliases' },
    { args: 'image', comment: 'Filter the properties to keep only those with labels matching "image"' },
    { args: '--type Url', comment: 'Filter the properties to keep only those of type Url (other possible types: ExternalId, String, WikibaseItem, WikibaseProperty, Time, Monolingualtext, Quantity, CommonsMedia, GlobeCoordinate)' },
    { args: '--type Url ref', comment: 'Filter the properties to keep only those of type Url matching the pattern "ref"' },
    { args: '--lang sv', comment: 'Output all the properties with their label in Swedish' },
    { args: '--no-cache', comment: 'Ignore properties cache: fetch properties from the SPARQL endpoint, even if already cached' },
    { args: '--reset', comment: 'Delete all the cached properties files to get fresh versions on the next execution' },
  ],
}
