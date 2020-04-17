module.exports = {
  alias: 'o',
  args: '<entity>',
  description: "open the entity's page on Wikidata website",
  options: {
    lang: true,
    verbose: true,
    clipboard: true,
    json: false,
    instance: true,
    sparqlEndpoint: false
  },
  examples: [
    { args: 'Q44559', comment: 'open https://www.wikidata.org/entity/Q44559 in your default browser' },
    { args: 'P123', comment: 'open https://www.wikidata.org/entity/P123' },
    { args: 'L525', comment: 'open https://www.wikidata.org/entity/L525' },
    { args: 'L525-F1', comment: 'open https://www.wikidata.org/entity/L525-F1' },
    { args: 'L525-S1', comment: 'open https://www.wikidata.org/entity/L525-S1' },
    { args: 'Q44559 --history', comment: 'open the entity history page' },
    { args: 'Q44559 --revision 942578737', comment: 'open the entity page at a given revision' },
    { args: 'Q44559 --wikipedia', comment: 'open the article on Exoplanets in Wikipedia' },
    { args: 'Q44559 --wikipedia --lang pt', comment: 'open the article on Exoplanets in the Portugese Wikipedia' },
    { args: 'Q44559 --url', comment: 'outputs the URL without opening the browser' },
    { args: 'Q44559 L525 P123', comment: 'open several pages at once' }
  ]
}
