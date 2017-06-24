const entityDataParser = require('./entity_data_parser')
const entityAttributeParser = require('./entity_attribute_parser')
const pluralize = require('./pluralize')

module.exports = (attribute) => {
  const commandName = attribute
  const pluarlizedAttribute = pluralize(attribute)
  const props = [ pluarlizedAttribute ]

  const parser = function (entity, options) {
    const { lang, output } = options
    const value = entityAttributeParser(entity, attribute, lang)
    if (value != null) {
      output(value)
    } else {
      throw new Error(`entity ${attribute} not found`)
    }
  }

  entityDataParser({ commandName, props, parser })
}
