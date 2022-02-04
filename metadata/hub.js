module.exports = {
  alias: 'h',
  args: '<query>',
  description: 'Open a web page using the Hub, see documentation: https://tools.wmflabs.org/hub/',
  options: {
    lang: true,
    verbose: true,
    clipboard: true,
    json: true,
    instance: false,
    sparqlEndpoint: false
  },
  examples: [
    { args: 'viaf:24597135', comment: 'Find the entity having 24597135 as VIAF id' },
    { args: '--open viaf:24597135 site=inventaire', comment: 'Find the entity having 24597135 as VIAF id and open the corresponding page on inventaire.io' },
    { args: 'Q3 property=image width=300', comment: 'Get the image illustrating Q3 in 300px' },
    { args: 'Q3 --url', comment: 'Just return the query URL' },
  ]
}
