const lightGet = require('../lib/light_get')
const _ = require('lodash')

module.exports = function getRedirectedTitle (lang, title) {
  title = encodeURIComponent(title)
  const url = `https://${lang}.wikipedia.org/w/api.php?format=json&action=query&redirects&titles=${title}`

  return lightGet(url)
  .then((body) => _.values(body.query.pages)[0].title)
}
