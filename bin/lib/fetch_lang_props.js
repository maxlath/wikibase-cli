var availableLangs = ['de', 'en', 'es', 'fr', 'it', 'nl']
var breq = require('bluereq')
require('colors')
var bluebird = require('bluebird')
var writeFileAsync = bluebird.promisify(require('fs').writeFile)
var base = 'https://raw.githubusercontent.com/maxlath/wikidata-properties-dumper/master/properties/'

module.exports = function (lang) {
  if ( !(/^\w{2}$/.test(lang)) ) {
    throw new Error(`invalid 2 letters language code: ${lang}`.red)
  } else if ( availableLangs.indexOf(lang) === -1 ) {
    throw new Error(`this language isn't available.
      Available languages: ${availableLangs}.
      You can make a request for your desired language here https://github.com/maxlath/wikidata-properties-dumper/issues )`.red)
  }

  var file = `${lang}.json`

  return breq.get(`${base}/${file}`)
  .then((res) => JSON.stringify(res.body, null, 2) )
  .then(writeFileAsync.bind(null, `bin/props/${file}`))
  .tap(console.log.bind(console, `${lang} props fetched`))
}
