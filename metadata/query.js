module.exports = {
  args: '',
  description: "generate and run a simple SPARQL query by passing a statement's subject, property, or object, or a couple of those",
  options: {
    lang: false,
    verbose: false,
    clipboard: false,
    json: false,
    instance: false,
    sparqlEndpoint: true
  },
  examples: [
    { args: '--property P2002 --object timberners_lee', comment: 'find out which entity as the twitter username (P2002) "timberners_lee"' },
    { args: '--property P921 --object Q44559 --labels', comment: 'find out which works have exoplanets (Q44559) for main subject (P921)\n    # and include labels' },
    { args: '-p P921 -o Q44559 -a', comment: 'as always, you can also use the short options syntax' },
    { args: '-p P921 -o Q44559 -a | jd 2', comment: 'the output is valid JSON, so you can pipe it to any JSON parser you like\n    # (here jsondepth a.k.a. jd)' },
    { args: '-s Q15228 -p P674 -a', comment: 'find out which are the characters (P674) in The Lord of The Ring (Q15228)' },
    { args: '-s Q15228 -o Q177499 -a', comment: 'find out which property link The Lord of The Ring (Q15228) and Gandalf (Q177499)' },
    { args: '-s Q177499 -a', comment: 'get the properties and objects for all the triples (subject, property, object) having Gandalf (Q177499) as subject' },
    { args: '-p P31 -o Q44559 --limit 5', comment: 'use the limit option to get only 5 instances of exoplanets (Q44559)' },
    { args: '-p P31 -o Q44559 --limit 5 --verbose', comment: 'use the verbose option to see the generated SPARQL and the generated query URL' }
  ]
}
