const entityDataParser = require('./entity_data_parser')
const entityAttributeParser = require('./entity_attribute_parser')
const pluralize = require('./pluralize')
const { grey, red } = require('chalk')
const _ = require('lodash')

module.exports = (attribute, extraParams) => {
  let commandName, ids
  if (extraParams) {
    ids = extraParams.ids
  } else {
    commandName = attribute
  }
  const pluarlizedAttribute = pluralize(attribute)
  const props = [ pluarlizedAttribute ]

  const parser = async ({ lang, strictLang, output, entities }) => {
    const entitiesList = _.values(entities)
    const multiEntities = entitiesList.length > 1
    const maxLength = _.max(entitiesList.map(entity => entity.id.length)) + 1
    entitiesList.forEach(logAttribute(attribute, lang, strictLang, multiEntities, maxLength, output))
  }

  entityDataParser({ commandName, props, parser, ids })
}

const logAttribute = (attribute, lang, strictLang, multiEntities, maxLength, output) => entity => {
  let value
  try {
    value = entityAttributeParser(entity, attribute, lang, strictLang)
  } catch (err) {
    if (err.message === 'invalid attribute for entity type') {
      console.error(red(err.message), err.context)
      return
    } else {
      throw err
    }
  }
  // Prefix value with the id if there are multiple entities
  if (multiEntities) {
    console.log(grey(_.padEnd(entity.id, maxLength)), value || grey('not found'))
  } else {
    output(value)
  }
}
