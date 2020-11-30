module.exports = {
  parseGuid: guid => {
    return guid
      // Convert a statement prefixed uri to a guid:
      //  - from: wds:Q1827902-6706334E-D27E-4F4B-B6DA-ABE7544DF11C
      //  - to: Q1827902$6706334E-D27E-4F4B-B6DA-ABE7544DF11C
      .replace(/^(wds|s):([QPL]\d+)-(.*)/i, '$2$$$3')
      // Often required when getting guids from the command line, as passing a value with a $
      // can be challenging, and require different quoting strategies
      .replace(/("|')/g, '')
      .trim()
  }
}
