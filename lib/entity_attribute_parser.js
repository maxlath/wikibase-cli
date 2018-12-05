const _ = require('lodash')
const pluralize = require('./pluralize')

module.exports = (entity, attribute, lang, strictLang) => {
  if (entity.missing != null) return
  const pluarlizedAttribute = pluralize(attribute)
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
