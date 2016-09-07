module.exports = {
  label: {
    args: '<entity>',
    description: 'display the entity or property label',
    examples: [
      { args: 'Q123', comment: 'fetch the label for the entity Q123' },
      { args: 'Q123 --lang ja', comment: 'fetch the label for the entity Q123 in Japanese' }
    ]
  },
  claims: {
    args: '<entity> [property]',
    description: 'display the claims of an entity',
    examples: [
      { args: 'Q123', comment: 'fetch all claims for the entity Q123' },
      { args: 'Q123 --lang de', comment: 'fetch all claims for the entity Q123 with properties labels in German' }
    ]
  },
  data: {
    args: '<entity>',
    description: "output the entity's data",
    examples: [
      { args: 'Q123', comment: "fetch Q123's raw data" },
      { args: 'Q1496 | jd labels.pt', comment: "take advantage of the raw data being output as JSON\n    # to pass it to a JSON parsers (here jsondepth a.k.a. jd)\n    # and get only the piece of data you're looking for" }
    ]
  },
  props: {
    args: '',
    description: 'output the list of all Wikidata properties',
    examples: [
      { args: '', comment: 'output all the properties' },
      { args: '| grep image', comment: 'filter the properties to keep only those related to images' },
      { args: '--lang sv', comment: 'output all the properties with their label in Swedish' },
      { args: '--reset', comment: 'delete all the cached properties files to get fresh versions on the next execution' }
    ]
  },
  wikiqid: {
    args: '<title>',
    description: 'get a Wikidata id from a Wikipedia article title',
    examples: [
      { args: 'Cantabria', comment: 'get the Wikidata id corresponding to the article "Cantabria" in Wikipedia' },
      { args: 'science politique --lang fr', comment: 'get the Wikidata id corresponding to the article "science politique" in the French Wikipedia' }
    ]
  },
  sparql: {
    args: '<file.rq>',
    description: 'run a SPARQL query and get its JSON output',
    examples: [
      { args: './path/to/query.rq', comment: 'make a SPARQL request to query.wikidata.org from a file' },
      { args: './path/to/query.rq > ./results.json ', comment: 'output it in a file instead of the terminal' },
      { args: './path/to/query.rq --raw', comment: 'get the raw results as query.wikidata.org outputs them, instead of a simplified version' }
    ]
  },
  query: {
    args: '',
    description: "generate and run a simple SPARQL query by passing a statement's subject, property, or object, or a couple of those",
    examples: [
      { args: '--property P2002 --object timberners_lee', comment: 'find out which entity as the twitter username (P2002) "timberners_lee"' },
      { args: '--property P921 --object Q44559 --labels', comment: 'find out which works have exoplanets (Q44559) for main subject (P921)\n    # and include labels' },
      { args: '-p P921 -o Q44559 -a', comment: 'as always, you can also use the short options syntax' },
      { args: '-p P921 -o Q44559 -a | jd 2', comment: 'the output is valid JSON, so you can pipe it to any JSON parser you like\n    # (here jsondepth a.k.a. jd)' },
      { args: '-s Q15228 -p P674 -a', comment: 'find out which are the characters (P674) in The Lord of The Ring (Q15228)' },
      { args: '-s Q15228 -o Q177499 -a', comment: 'find out which property link The Lord of The Ring (Q15228) and Gandalf (Q177499)' },
      { args: '-s Q177499 -a', comment: 'get the properties and objects for all the triples (subject, property, object) having Gandalf (Q177499) as subject' },
      { args: '-p P31 -o Q44559 --limit 5', comment: 'use the limit option to get only 5 instances of exoplanets (Q44559)' },
      { args: '-p P31 -o Q44559 --limit 5 --debug', comment: 'use the debug option to see the generated SPARQL and the generated query URL' }
    ]
  },
  open: {
    args: '<entity>',
    description: "open the entity's page on Wikidata website",
    examples: [
      { args: 'Q44559', comment: 'open https://www.wikidata.org/wiki/Q44559 in your default browser' },
      { args: 'Q44559 --wikipedia', comment: 'open the article on Exoplanets in Wikipedia' },
      { args: 'Q44559 --wikipedia --lang pt', comment: 'open the article on Exoplanets in the Portugese Wikipedia' }
    ]
  }
}
