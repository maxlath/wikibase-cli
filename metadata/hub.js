module.exports = {
  args: '<query>',
  description: 'Open a web page using the Hub, see documentation: https://tools.wmflabs.org/hub/',
  options: {
    lang: true,
    verbose: false,
    clipboard: false,
    json: true,
    instance: false,
    sparqlEndpoint: false
  },
  examples: [
    { args: 'viaf:24597135 s=inv', comment: 'Find the entity having 24597135 as VIAF id and open the corresponding page on inventaire.io' },
    { args: 'Q3 property=image width=300 --json | jd destination.url', comment: 'Get the image illustrating Q3 in 300px' }
  ]
}
