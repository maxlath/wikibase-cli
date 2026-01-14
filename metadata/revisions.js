export default {
  alias: 'r',
  args: '<entity>',
  description: "output the entity's revisions data",
  options: {
    lang: false,
    verbose: false,
    clipboard: false,
    json: false,
    instance: true,
    sparqlEndpoint: false,
  },
  examples: [
    { args: 'Q3548931', comment: "fetch Q3548931's revisions data" },
    { args: 'Q3548931 -p content,user,ids,comment,timestamp,flags,oresscores', comment: "fetch only certain attributes from Q3548931's revisions data" },
    { args: 'Q3548931 -u InventaireBot', comment: "fetch Q3548931's revisions data from the user InventaireBot" },
    { args: 'Property:P31', comment: "fetch P31's revisions data" },
  ],
}
