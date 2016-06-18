require('colors')
Promise = require('bluebird')
const breq = require('bluereq')
const wdk = require('wikidata-sdk')

module.exports = function (lang) {
  if ( !(/^\w{2}$/.test(lang)) ) {
    err = new Error(`invalid 2 letters language code: ${lang}`.red)
    return Promise.reject(err)
  }
  const sparql = require('./queries/all_properties')(lang)
  const url = wdk.sparqlQuery(sparql)

  return breq.get(url)
  .then(formatResults)
}


formatResults = (res) => {
  const map = {}
  wdk.simplifySparqlResults(res.body)
  .forEach((prop)=> {
    const value = prop.property.value
    const label = prop.property.label
    // when the label is missing, we get the property id instead
    if (value !== label) {
      map[value] = label
    } else {
      map[value] = null
    }
  })
  return map
}
