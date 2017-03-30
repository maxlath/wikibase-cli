const _ = require('lodash')

module.exports = (entity, attribute, lang) => {
  const pluarlizedAttribute = `${attribute}s`
  const attrData = entity[pluarlizedAttribute]
  const valueObj = attrData[lang] || attrData['en'] || _.values(attrData)[0]
  return valueObj && valueObj.value
}
