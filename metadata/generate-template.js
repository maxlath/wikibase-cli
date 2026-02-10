export default {
  alias: 'gt',
  args: '<entity>',
  description: "Output the pre-formatted item's data optimized for edition with `wd edit-item`",
  options: {
    lang: false,
    verbose: false,
    clipboard: false,
    json: true,
    instance: true,
    sparqlEndpoint: false,
  },
  examples: [
    { args: 'Q123', comment: 'Get Q123 pre-formatted data' },
    { args: 'Q123 --props claims,sitelinks', comment: 'Only get data required to edit the claims and sitelinks' },
    { args: 'Q123 --props claims.P31,sitelinks.frwiki', comment: 'Only get data required to edit the P31 claims and the frwiki sitelink' },
    { args: 'Q123 --format js', comment: 'Get the template in JS (easier to edit manually than JSON and still compatible with create-entity and edit-entity commands)' },
    { args: 'Q123 Q124 Q125', comment: 'Get several templates at once as NDJSON' },
  ],
}
