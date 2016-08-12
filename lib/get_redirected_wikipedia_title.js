const breq = require('bluereq')
const _ = require('lodash')

module.exports = function getRedirectedTitle (lang, title) {
  const url = `https://${lang}.wikipedia.org/w/api.php?format=json&action=query&redirects&titles=${title}`

  return breq.get(url)
  .then((res) => _.values(res.body.query.pages)[0].title)
}