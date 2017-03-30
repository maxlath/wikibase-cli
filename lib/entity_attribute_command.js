const entityDataParser = require('../lib/entity_data_parser')
const _ = require('lodash')

module.exports = (attribute) => {
  const commandName = attribute
  const pluarlizedAttribute = `${attribute}s`
  const props = [ pluarlizedAttribute ]

  const parser = function (entity, options) {
    const { lang } = options
    const attrData = entity[pluarlizedAttribute]
    const valueObj = attrData[lang] || attrData['en'] || _.values(attrData)[0]
    if (valueObj != null) {
      return valueObj.value
    } else {
      throw new Error(`entity ${attribute} not found`)
    }
  }

  entityDataParser({ commandName, props, parser })
}
