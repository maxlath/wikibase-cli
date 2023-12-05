// Normalize prefixed statements GUIDs as returned by SPARQL queries:
// to the format used by Wikibase API
//  - from: wds:Q1827902-6706334E-D27E-4F4B-B6DA-ABE7544DF11C
//  - to: Q1827902$6706334E-D27E-4F4B-B6DA-ABE7544DF11C
// Also accept Q1827902-6706334E-D27E-4F4B-B6DA-ABE7544DF11C
export const parseGuid = guid => {
  guid = guid
    // Drop prefix
    .replace(/^[a-z]+:/, '')
    .replace(/^([QPLM]\d+(-[FS]\d+)?)-([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i, '$1$$$3')
    // Often required when getting guids from the command line, as passing a value with a $
    // can be challenging, and require different quoting strategies
    .replace(/("|')/g, '')
    .replace('\\$', '$')
    .trim()
  return guid
}
