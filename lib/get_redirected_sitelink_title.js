const { get } = require('../lib/request')
const _ = require('lodash')

module.exports = (lang, site, title) => {
  title = encodeURIComponent(title)
  const url = `https://${lang}.${site}.org/w/api.php?format=json&action=query&redirects&titles=${title}`
  return get(url)
  .then(body => _.values(body.query.pages)[0].title)
}
