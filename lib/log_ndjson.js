// Log as newline-delimited JSON à-la Wikidata Dump
module.exports = entities => {
  console.log('[')
  const lastEntityIndex = entities.length - 1
  entities.forEach((entity, index) => {
    process.stdout.write(JSON.stringify(entity))
    if (index < lastEntityIndex) process.stdout.write(',')
    process.stdout.write('\n')
  })
  console.log(']')
}
