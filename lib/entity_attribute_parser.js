const _ = require('lodash')
const pluralize = require('./pluralize')
const errors_ = require('../lib/errors')

module.exports = (entity, attribute, lang, strictLang) => {
  if (entity.missing != null) return
  const pluarlizedAttribute = pluralize(attribute)
  const { id, type } = entity
  if (!attributesPerType[type].includes(pluarlizedAttribute)) {
    throw errors_.new('invalid attribute for entity type', { id, type, attribute })
  }
  const attrData = entity[pluarlizedAttribute]
  let valueObj
  if (strictLang != null) valueObj = attrData[strictLang]
  else valueObj = attrData[lang] || attrData.en || _.values(attrData)[0]
  if (_.isArray(valueObj)) {
    return valueObj.map(_.property('value')).join(' | ')
  } else {
    return valueObj && valueObj.value
  }
}

const attributesPerType = {
  item: [ 'labels', 'descriptions', 'aliases' ],
  property: [ 'labels', 'descriptions', 'aliases' ],
  lexeme: [ 'lemmas' ]
}
