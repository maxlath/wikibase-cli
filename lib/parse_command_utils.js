module.exports = {
  // Often required when getting guids from the command line, as passing a value with a $
  // can be challenging, and require different quoting strategies
  parseGuid: guid => guid.replace(/("|')/g, '').trim()
}
