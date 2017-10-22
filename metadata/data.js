module.exports = {
  args: '<entity>',
  description: "output the entity's data",
  options: {
    lang: false,
    verbose: false,
    clipboard: false,
    json: false,
    instance: true,
    sparqlEndpoint: false
  },
  examples: [
    { args: 'Q123', comment: "fetch Q123's raw data" },
    { args: '--props labels,claims,sitelinks Q123', comment: "fetch Q123's labels, claims, and sitelinks only" },
    { args: ' --simplify Q123', comment: 'fetch Q123 simplified data' },
    { args: 'Q1496 | jd labels.pt', comment: "take advantage of the raw data being output as JSON\n    # to pass it to a JSON parsers (here jsondepth a.k.a. jd)\n    # and get only the piece of data you're looking for" }
  ]
}
