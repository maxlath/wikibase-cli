module.exports = {
  parseGuid: guid => {
    return guid
      // Normalize prefixed statements GUIDs as returned by SPARQL queries:
      // to the format used by Wikibase API
      //  - from: wds:Q1827902-6706334E-D27E-4F4B-B6DA-ABE7544DF11C
      //  - to: Q1827902$6706334E-D27E-4F4B-B6DA-ABE7544DF11C
      .replace(/^[a-z]+:([QPL]\d+)-(.*)/i, '$1$$$2')
      // Often required when getting guids from the command line, as passing a value with a $
      // can be challenging, and require different quoting strategies
      .replace(/("|')/g, '')
      .replace('\\$', '$')
      .trim()
  }
}
