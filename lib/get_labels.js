const lightGet = require('./light_get')
const entityAttributeParser = require('./entity_attribute_parser')
const _ = require('lodash')

module.exports = program => {
  const wdk = require('./customized_wdk')(program)
  const { lang } = program
  const languages = lang === 'en' ? 'en' : [ lang, 'en' ]
  return ids => {
    // Use getManyEntities for cases where this requests more than 50 entities
    ids = _.uniq(ids)
    const urls = wdk.customize('getManyEntities', ids, languages, 'labels')

    return getEntities(urls)
    .then(buildLabelsIndex(lang))
  }
}

const getEntities = urls => {
  return Promise.all(urls.map(lightGet))
  .then(results => _.flatten(results.map(body => _.values(body.entities))))
}

const buildLabelsIndex = lang => entities => {
  const index = {}
  entities.forEach(entity => {
    const { id } = entity
    index[id] = entityAttributeParser(entity, 'label', lang)
  })
  return index
}
