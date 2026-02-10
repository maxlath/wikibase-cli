export default {
  alias: 'r',
  args: '<entity>',
  description: "Output the entity's revisions data",
  options: {
    lang: false,
    verbose: false,
    clipboard: false,
    json: false,
    instance: true,
    sparqlEndpoint: false,
  },
  examples: [
    { args: 'Q3548931', comment: "Fetch Q3548931's revisions data" },
    { args: 'Q3548931 -p content,user,ids,comment,timestamp,flags,oresscores', comment: "Fetch only certain attributes from Q3548931's revisions data" },
    { args: 'Q3548931 -u InventaireBot', comment: "Fetch Q3548931's revisions data from the user InventaireBot" },
    { args: 'Property:P31', comment: "Fetch P31's revisions data" },
  ],
}
