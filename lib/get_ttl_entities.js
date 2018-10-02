const lightGet = require('./light_get')

module.exports = ids => {
  var isFirst = true

  const getNext = () => {
    const id = ids.shift()
    if (!id) return

    return lightGet(`https://www.wikidata.org/wiki/Special:EntityData/${id}.ttl`)
    .then(body => {
      if (isFirst) isFirst = false
      else body = removePrefixes(body)
      console.log(body)
    })
    .then(getNext)
  }

  return getNext()
  .catch(console.error)
}

const removePrefixes = ttl => {
  return ttl
    .split('\n')
    .filter(line => !line.startsWith('@prefix'))
    .join('\n')
}
