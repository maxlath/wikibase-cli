module.exports = {
  args: '<entity>',
  description: "output the entity's data",
  options: {
    lang: false
  },
  examples: [
    { args: 'Q123', comment: "fetch Q123's raw data" },
    { args: 'Q1496 | jd labels.pt', comment: "take advantage of the raw data being output as JSON\n    # to pass it to a JSON parsers (here jsondepth a.k.a. jd)\n    # and get only the piece of data you're looking for" }
  ]
}
