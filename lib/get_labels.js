const { get } = require('./request')
const entityAttributeParser = require('./entity_attribute_parser')
const _ = require('lodash')
const exitOnMissing = require('../lib/exit_on_missing')
const WBK = require('./wbk')

module.exports = program => {
  exitOnMissing.instance(program.instance)
  const { getManyEntities } = WBK(program)
  const { lang } = program
  const languages = lang === 'en' ? 'en' : [ lang, 'en' ]
  return async ids => {
    // Use getManyEntities for cases where this requests more than 50 entities
    ids = _.uniq(ids)
    const urls = getManyEntities(ids, languages, 'labels')

    const entities = await getEntities(urls)
    return buildLabelsIndex(lang, entities)
  }
}

const getEntities = async urls => {
  const results = await Promise.all(urls.map(get))
  return _.flatten(results.map(body => _.values(body.entities)))
}

const buildLabelsIndex = (lang, entities) => {
  const index = {}
  entities.forEach(entity => {
    const { id } = entity
    index[id] = entityAttributeParser(entity, 'label', lang)
  })
  return index
}
