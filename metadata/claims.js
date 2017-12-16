module.exports = {
  args: '<entity> [property]',
  description: 'display the claims of an entity',
  options: {
    lang: true,
    verbose: true,
    clipboard: true,
    json: true,
    instance: true,
    sparqlEndpoint: true
  },
  examples: [
    { args: 'Q2001', comment: 'fetch all claims for the entity Q2001' },
    { args: 'Q2001 P106', comment: 'or just the claims for the property P106' },
    { args: 'Q2001 Url', comment: 'or just the claims from properties of type Url (other possible types: ExternalId, String, WikibaseItem, WikibaseProperty, Time, Monolingualtext, Quantity, CommonsMedia, GlobeCoordinate)' },
    { args: 'Q2001 library', comment: 'or just the claims from properties with labels matching "library"' },
    { args: 'Q2001 website', comment: 'or website, etc' },
    { args: 'Q2001 --lang de', comment: 'fetch all claims for the entity Q2001 with properties labels in German' }
  ]
}
