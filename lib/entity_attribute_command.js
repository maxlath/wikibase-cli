const entityDataParser = require('./entity_data_parser')
const entityAttributeParser = require('./entity_attribute_parser')
const pluralize = require('./pluralize')
const { grey } = require('chalk')
const _ = require('lodash')

module.exports = attribute => {
  const commandName = attribute
  const pluarlizedAttribute = pluralize(attribute)
  const props = [ pluarlizedAttribute ]

  const parser = options => entities => {
    const { lang, strictLang, output } = options
    const entitiesList = _.values(entities)
    const multiEntities = entitiesList.length > 1
    const maxLength = _.max(entitiesList.map(entity => entity.id.length)) + 1

    entitiesList
    .forEach(entity => {
      const value = entityAttributeParser(entity, attribute, lang, strictLang)
      // Prefix value with the id if there are multiple entities
      if (multiEntities) console.log(grey(_.padEnd(entity.id, maxLength)), value || grey('not found'))
      else output(value)
    })
  }

  entityDataParser({ commandName, props, parser })
}
